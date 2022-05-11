import { networkInterfaces, type NetworkInterfaceInfo } from 'os';
import { getNetworkIFacesInfoByWmic } from './getIFacesByExec';
import { isZeroMac, hasMutiMac, logDebug, isVirtualMac } from './utils';

/** sort by: !internal > !zeroMac(mac) > desc for visual > family=IPv4 */
function ifacesSort(list: NetworkInterfaceInfo[]) {
  return list.sort((a, b) => {
    if (a.internal !== b.internal) return a.internal ? 1 : -1;
    if (isZeroMac(a.mac) !== isZeroMac(b.mac)) return isZeroMac(a.mac) ? 1 : -1;

    const isVirtualA = isVirtualMac(a.mac);
    const isVirtualB = isVirtualMac(b.mac);
    if (isVirtualA !== isVirtualB) return isVirtualA ? 1 : -1;

    if (a.family !== b.family) return a.family === 'IPv6' ? 1 : -1;
  });
}

function getNif() {
  const nif = networkInterfaces();

  for (const key in nif) {
    if (key.includes('以太网')) {
      nif[key.replace('以太网', 'ethernet')] = nif[key];
      delete nif[key];
    }
  }
  return nif;
}

/** get all networkInterfaces and sort by some rules */
export function getAllNetworkIFaces() {
  const nif = getNif();
  const list: NetworkInterfaceInfo[] = [];

  // en0 - mac, eth3 - linux, ethernet - windows
  const highPriorityIfaces = /^((en|eth)\d+|ethernet)$/i;
  const lowPriorityIfaces = /^((lo|vboxnet)\d+)$/i;
  const ifaces = Object.keys(nif).sort((a, b) => {
    if (highPriorityIfaces.test(a)) {
      if (highPriorityIfaces.test(b)) return a.localeCompare(b);
      return -1;
    }
    if (lowPriorityIfaces.test(a)) {
      if (lowPriorityIfaces.test(b)) return a.localeCompare(b);
      return 1;
    }
    if (highPriorityIfaces.test(b)) return 1;
    if (lowPriorityIfaces.test(b)) return -1;
    return a.localeCompare(b);
  });

  for (const key of ifaces) {
    for (const item of nif[key]) list.push(item);
  }

  return ifacesSort(list);
}

export async function getNetworkIFaces(iface?: string, family?: 'IPv4' | 'IPv6') {
  let list: NetworkInterfaceInfo[] = [];

  if (iface) {
    const nif = getNif();

    if (nif[iface]) {
      list = nif[iface];
      if (family) list = list.filter(d => d.family === family);
      if (list.length > 1) list = list.filter(d => !d.internal && !isZeroMac(d.mac));
    }
    return ifacesSort(list);
  }

  list = getAllNetworkIFaces().filter(item => !item.internal && !isZeroMac(item.mac) && (!family || item.family === family));

  if (hasMutiMac(list)) list = list.filter(d => d.address);
  if (hasMutiMac(list)) list = list.filter(d => !isVirtualMac(d.mac));

  // filter by desc for windows
  if (hasMutiMac(list)) {
    const virtualDescList = ['virtual', ' vpn ', ' ssl ', 'tap-windows', 'hyper-v', 'km-test', 'microsoft loopback'];
    // const info = await getNetworkIFacesInfoByIpconfig();
    const info = await getNetworkIFacesInfoByWmic();

    list = list.filter(item => {
      if (!info.config[item.mac]) return true;
      const desc = String(info.config[item.mac].desc).toLowerCase();
      return !virtualDescList.some(d => desc.includes(d));
    });
  }

  logDebug('[getNetworkIFaces]', list);
  return list;
}

export function getNetworkIFaceOne(iface?: string) {
  return getNetworkIFaces(iface).then(list => list[0]);
}
