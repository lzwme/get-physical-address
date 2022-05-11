import { exec, execSync, type ExecException, type ExecOptions } from 'child_process';
import { ObjectEncodingOptions } from 'fs';
import process from 'process';
import { formatMac, logDebug } from './utils';

export interface IpconfigNIFItem {
  desc?: string;
  ipv4?: string;
  ipv6?: string;
  ipv6LinkLocal?: string;
  mac?: string;
  network?: string;
  dnsSuffix?: string;
  dns?: string[];
  subnetmask?: string;
  dhcpEnabled?: boolean;
  dhcpServer?: string;
  dhcpv6IAID?: string;
  dhcpv6DUID?: string;
  isMain?: boolean;
}

function execPromisfy(cmd: string, options: ObjectEncodingOptions & ExecOptions = {}, trimEmptyLine = false) {
  return new Promise<{ error: ExecException; stdout: string; stderr: string }>(resolve => {
    exec(cmd, { windowsHide: true, ...options }, (error, stdout, stderr) => {
      if (error) console.error('exec error:', `cmd: ${cmd}\n`, error.message || error);
      stdout = stdout.replace(/\r+\n/g, '\n').trim();
      if (trimEmptyLine) stdout = stdout.replace(/\n{2,}/g, '\n');
      resolve({ error, stdout, stderr });
    });
  });
}

export async function getNetworkIFacesInfoByIpconfig() {
  const config: { [mac: string]: IpconfigNIFItem } = {};
  let stdout = '';

  if (process.platform === 'win32') {
    // https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/ipconfig
    const iconv = await import('iconv-lite');
    const cmd = 'ipconfig /all';
    // const info = await execPromisfy(cmd, { encoding: 'binary' });
    // stdout = iconv.decode(Buffer.from(info.stdout, 'binary'), 'gbk').trim();
    stdout = iconv.decode(execSync(cmd, { encoding: 'binary', windowsHide: true }) as never, 'gbk').trim();

    const keyMap = {
      '连接特定的 DNS 后缀': 'dnsSuffix',
      'Connection-specific DNS Suffix': 'dnsSuffix',
      描述: 'desc',
      Description: 'desc',
      物理地址: 'mac',
      'Physical Address': 'mac',
      'IPv6 地址': 'ipv6',
      'IPv6 Address': 'ipv6',
      '本地链接 IPv6 地址': 'ipv6LinkLocal',
      'Link-local IPv6 Address': 'ipv6LinkLocal',
      'IPv4 地址': 'ipv4',
      'IPv4 Address': 'ipv4',
      'IP Address': 'ipv4',
      子网掩码: 'subnetmask',
      'Subnet Mask': 'subnetmask',
      默认网关: 'gateway',
      'Default Gateway': 'gateway',
      'DHCP 服务器': 'dhcpServer',
      'DHCP Server': 'dhcpServer',
      'DHCPv6 IAID': 'dhcpv6IAID',
      'DHCPv6 客户端 DUID': 'dhcpv6DUID',
      'DNS 服务器': 'dns',
      'DNS Servers': 'dns',
      'DHCP 已启用': 'dhcpEnabled',
      'DHCP Enabled': 'dhcpEnabled',
      // '自动配置已启用': 'dhcpEnabled',
      获得租约的时间: 'leaseObtained',
      'Lease Obtained': 'leaseObtained',
      租约过期的时间: 'leaseExpires',
      'Lease Expires': 'leaseExpires',
    };
    const lines = stdout.replace(/(\. )+:/g, ':').split('\n');
    let item: IpconfigNIFItem = {};
    let key = '';
    let value: string | boolean = '';
    const setToConfig = () => {
      if (item.mac) {
        item.mac = formatMac(item.mac);
        config[item.mac] = item;
      }
      item = {};
    };

    for (let line of lines) {
      if (!line) continue;
      if (line.startsWith('  ')) {
        if (line.includes(':')) {
          [key, value] = line.split(':').map(d => d.trim());

          if (keyMap[key]) key = keyMap[key];
          if (value.includes('首选') || value.includes('Preferred')) {
            value = value.replace(/[^\d.]/g, '');
            item.isMain = true;
          } else if (['Yes', 'No'].includes(value)) {
            value = value === 'Yes';
          }

          item[key] = key === 'dns' ? [value] : value;
        } else {
          line = line.trim();
          if (key === 'dns' && item.dns && /^(\d+\.)+\d+$/.test(line)) item.dns.push(line);
        }
      } else {
        setToConfig();
      }
    }
    setToConfig();

    logDebug(`[exec]cmd: ${cmd}. getNetworkIFacesInfo:`, stdout, config);
  }

  return { stdout, config };
}

export async function getNetworkIFacesInfoByWmic() {
  const config: { [mac: string]: IpconfigNIFItem } = {};
  let stdout = '';

  if (process.platform === 'win32') {
    const keyMap = { MACAddress: 'mac', Description: 'desc' };
    const cmd = `wmic nic get MACAddress,Description  /format:list`;
    const info = await execPromisfy(cmd);
    const lines = info.stdout.split('\n').filter(d => d.includes('='));

    stdout = info.stdout;
    if (lines[0]) {
      let item: Record<string, string> = {};

      for (const line of lines) {
        let [key, value] = line.split('=').map(d => d.trim());
        key = keyMap[key] || key.toLowerCase();

        if (item[key]) {
          if (item.mac) config[item.mac] = item;
          item = {};
        }
        item[key] = value;
      }
      if (item.mac) config[item.mac] = item;
    }

    if (stdout) logDebug(`[getNetworkIFacesInfoByWmic]`, stdout, config);
  }

  return { stdout, config };
}
