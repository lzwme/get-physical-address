/*
 * @Author: renxia
 * @Date: 2023-03-23 23:02:16
 * @LastEditors: renxia
 * @LastEditTime: 2023-12-08 09:43:26
 * @Description:
 */
import { execSync } from 'child_process';
import process from 'process';
import { formatMac, isVirtualMac, logDebug } from './utils';
import { IpconfigNIFItem } from './getIFacesByExec';

/**
 * get by ipconfig /all: only for test
 */
export async function getNetworkIFacesInfoByIpconfig() {
  const config: { [mac: string]: IpconfigNIFItem } = {};
  let stdout = '';

  if (process.platform === 'win32') {
    // https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/ipconfig
    const { default: iconv } = await import('iconv-lite');
    const cmd = 'ipconfig /all';
    // const info = await execPromisfy(cmd, { encoding: 'binary' });
    // stdout = iconv.decode(Buffer.from(info.stdout, 'binary'), 'gbk').trim();
    stdout = iconv.decode(execSync(cmd, { windowsHide: true }) as never, 'gbk').trim();

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
        if (!config[item.mac] || !isVirtualMac('', item.desc)) config[item.mac] = item;
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
