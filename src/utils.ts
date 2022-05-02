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

export function isValidMac(mac: string) {
  return !isZeroMac(mac) && isMac(mac);
}

export function formatMac(mac: string) {
  return mac.trim().toLowerCase().replace(/-/g, ':');
}

export function hasMutiMac(list: NetworkInterfaceInfo[]) {
  if (!list || list.length === 0) return false;
  return new Set(list.map(d => d.mac)).size > 1;
}
