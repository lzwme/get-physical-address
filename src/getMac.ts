import { getNetworkIFaces, getNetworkIFaceOne, getAllNetworkIFaces } from './getNetworkInteraces';
import { isZeroMac } from './utils';

export function getAllMac() {
  const list = getAllNetworkIFaces();
  const macSet = new Set<string>();

  for (const item of list) {
    if (!item.internal && !isZeroMac(item.mac)) macSet.add(item.mac);
  }

  return [...macSet];
}

export function getAllPhysicsMac(family?: 'IPv4' | 'IPv6') {
  return getNetworkIFaces('', family).then(d => [...new Set(d.map(m => m.mac))]);
}

export function getMac(iface?: string) {
  return getNetworkIFaceOne(iface).then(item => item?.mac);
}
