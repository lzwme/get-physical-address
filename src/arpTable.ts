/*
 * @Author: renxia
 * @Date: 2023-12-08 09:31:39
 * @LastEditors: renxia
 * @LastEditTime: 2023-12-08 11:50:52
 * @Description:
 */
import { execSync } from 'child_process';
import { isIP } from 'net';
import process from 'process';
import { formatMac } from './utils';
import { getNetworkIFaceOne } from './getNetworkInteraces';

export type ArpTableItem = {
  /** interface ip address */
  iip: string;
  ip: string;
  mac: string;
  type: 'static' | 'dynamic' | 'unknown';
};

export async function getArpTable(stdout = '') {
  const isWindows = process.platform === 'win32';
  if (!stdout) {
    if (isWindows) {
      const { default: iconv } = await import('iconv-lite');
      stdout = iconv.decode(execSync('arp -a', { windowsHide: true }), 'gbk').trim();
    } else {
      stdout = execSync('arp -an', { windowsHide: true }).toString('utf8').trim();
    }
  }

  const table: ArpTableItem[] = [];
  let iip = '';
  let iface = '';

  for (const line of stdout.split('\n').map(d => d.trim())) {
    if (!line) continue;
    let ip = '';
    let mac = '';
    let type = 'unknown';

    if (isWindows) {
      [ip, mac, type = 'unknown'] = line.split(/\s+/);

      if (isIP(mac)) {
        iip = mac;
        continue;
      }

      if (type.includes('动态')) type = 'dynamic';
      else if (type.includes('静态')) type = 'static';
    } else {
      const match = line.match(/\(([\d.]+)\) at (\S+) .*on ([\da-z]+)/);
      if (!match) continue;

      const preIface = iface;
      [, ip, mac, iface] = match;

      if (preIface !== iface) {
        const item = await getNetworkIFaceOne(iface);
        if (item) iip = item.address;
      }
    }

    if (isIP(ip)) {
      table.push({ iip, ip, mac: formatMac(mac), type: (type || 'unknown') as never });
    }
  }

  return { stdout, table };
}

export async function getArpMacByIp(ip: string) {
  if (!ip) return '';
  const { table } = await getArpTable();
  const item = table.find(d => d.ip === ip);
  return item ? item.mac : '';
}

export async function getArpIpByMac(mac: string) {
  mac = formatMac(mac);
  if (!mac) return '';
  const { table } = await getArpTable();
  const item = table.find(d => d.mac.includes(mac));
  return item ? item.ip : '';
}

// getArpTable().then(d => console.log(d.table));
