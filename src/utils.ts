import type { NetworkInterfaceInfo } from 'os';

export function isDebug() {
  return process.env.DEBUG === '*' || process.env.DEBUG === 'GPMA' || process.env.GPA_DEBUG === '1';
}

export function logDebug(...argument) {
  if (!isDebug()) return;
  if (globalThis.logger?.debug) globalThis.logger.debug(...argument);
  else console.debug(...argument);
}

export function isMac(mac: string) {
  return /^([\da-f]{1,2}[:-]){5}([\da-f]{1,2})$/i.test(mac);
}

export function hasMac(content: string) {
  return /([\da-f]{1,2}[:-]){5}([\da-f]{1,2})/gi.test(content);
}

export function isZeroMac(mac: string) {
  return /^(0{1,2}[:-]){5}0{1,2}$/.test(mac);
}

const invalidMacAddresses = new Set(['00:00:00:00:00:00', 'ff:ff:ff:ff:ff:ff', 'ac:de:48:00:11:22']);

// see https://standards-oui.ieee.org/oui/oui.txt
const virtualMacPrefix = new Set([
  '00:05:69', // vmware1
  '00:0c:29', // vmware2
  '00:50:56', // vmware3
  '00:1c:14', // vmware
  '00:1c:42', // parallels1
  '02:00:4c', // Microsoft Loopback Adapter (微软回环网卡)
  '00:03:ff', // microsoft virtual pc
  '00:0f:4b', // virtual iron 4
  '00:16:3e', // red hat xen , oracle vm , xen source, novell xen
  '08:00:27', // virtualbox
  '0a:00:27', // virtualbox
  '00:ff:78', // Sangfor
  '00:ff:9d', // Sangfor
]);

export function isVirtualMac(mac: string, desc?: string) {
  let isVirtual = false;

  if (mac) {
    isVirtual = isMac(mac) && virtualMacPrefix.has(formatMac(mac).slice(0, 8));
  }

  if (desc && !isVirtual) {
    const virtualDescList = [
      'virtual',
      ' vpn ',
      ' ssl ',
      'tap-windows',
      'hyper-v',
      'vEthernet', // vEthernet (Default Switch)
      'km-test',
      'microsoft loopback',
      'sangfor ',
    ];
    desc = String(desc).toLowerCase();
    isVirtual = virtualDescList.some(d => desc.includes(d));
  }

  return isVirtual;
}

export function isValidMac(mac: string) {
  return !invalidMacAddresses.has(formatMac(mac)) && isMac(mac);
}

export function formatMac(mac: string) {
  return String(mac).trim().toLowerCase().replace(/-/g, ':');
}

export function hasMutiMac(list: NetworkInterfaceInfo[], filter?: (mac: string) => boolean) {
  if (!list || list.length === 0) return false;
  if (typeof filter !== 'function') filter = isMac;
  return new Set(list.map(d => d.mac).filter(mac => filter(mac))).size > 1;
}
