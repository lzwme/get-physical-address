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
  if (typeof mac !== 'string') return false;
  return /^(0{1,2}[:-]){5}0{1,2}$/.test(mac.trim());
}

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
]);

export function isVirtualMac(mac: string) {
  return isMac(mac) && virtualMacPrefix.has(formatMac(mac).slice(0, 8));
}

export function isValidMac(mac: string) {
  return !isZeroMac(mac) && isMac(mac);
}

export function formatMac(mac: string) {
  return String(mac).trim().toLowerCase().replace(/-/g, ':');
}

export function hasMutiMac(list: NetworkInterfaceInfo[], filter?: (mac: string) => boolean) {
  if (!list || list.length === 0) return false;
  if (typeof filter !== 'function') filter = isMac;
  return new Set(list.map(d => d.mac).filter(mac => filter(mac))).size > 1;
}
