import { exec, execSync, type ExecException, type ExecOptions } from 'child_process';
import process from 'process';
import { formatMac, hasMac, logDebug } from './utils';

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

function execPromisfy(cmd: string, options: ExecOptions = {}) {
  return new Promise<{ error: ExecException; stdout: string; stderr: string }>(resolve => {
    exec(cmd, { windowsHide: true, ...options }, (error, stdout, stderr) => {
      if (error) console.error('exec error:', `cmd: ${cmd}\n`, error.message || error);
      resolve({ error, stdout: stdout.replace(/\n\n/g, '\n'), stderr });
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
    // stdout = iconv.decode((await execPromisfy(cmd)).stdout, 'gbk').trim();
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

    logDebug(`[exec]cmd: ${cmd}. stdout:\n${stdout}`);

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

    logDebug(`[exec]cmd: ${cmd}. getNetworkIFacesInfo:`, config);
  }

  return { config, stdout };
}

// todo
export async function getNetworkIFacesInfoByWmic() {
  const config: { [mac: string]: IpconfigNIFItem } = {};
  let stdout = '';

  if (process.platform === 'win32') {
    const cmd = `wmic nic get Caption MACAddress`;
    const info = await execPromisfy(cmd);
    stdout = info.stdout;
    if (stdout) {
      for (const line of stdout.split('\n')) {
        if (hasMac(line)) {
          const mac = formatMac(line.slice(0, 18).trim());
          const desc = line.slice(18).trim();
          config[mac] = { mac, desc };
        }
      }
    }

    if (stdout) logDebug(`[getNetworkIFacesInfoByWmic]`, stdout, config);
  }

  return { config, stdout };
}
