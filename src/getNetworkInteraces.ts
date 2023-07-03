import { networkInterfaces, type NetworkInterfaceInfo } from 'os';
import { getNetworkIFacesInfoByWmic } from './getIFacesByExec';
import { isZeroMac, hasMutiMac, logDebug, isVirtualMac } from './utils';

type NIFInfo = NetworkInterfaceInfo & { desc?: string };

/** sort by: !internal > !zeroMac(mac) > desc for visual > family=IPv4 */
function ifacesSort(list: NIFInfo[]) {
  return list.sort((a, b) => {
    if (a.internal !== b.internal) return a.internal ? 1 : -1;
    if (isZeroMac(a.mac) !== isZeroMac(b.mac)) return isZeroMac(a.mac) ? 1 : -1;

    const isVirtualA = isVirtualMac(a.mac);
    const isVirtualB = isVirtualMac(b.mac);
    if (isVirtualA !== isVirtualB) return isVirtualA ? 1 : -1;

    if (!a.address || !b.address) return a.address ? -1 : 1;

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
  let list: NIFInfo[] = [];

  if (iface) {
    const nif = getNif();

    if (nif[iface]) {
      list = nif[iface];
      if (family) list = list.filter(d => d.family === family);
      if (list.length > 1) list = list.filter(d => !isZeroMac(d.mac));
    }
    return ifacesSort(list);
  }

  list = getAllNetworkIFaces().filter(item => !isZeroMac(item.mac) && (!family || item.family === family));

  // if (hasMutiMac(list)) list = list.filter(d => d.address);
  // if (hasMutiMac(list)) list = list.filter(d => !isVirtualMac(d.mac));

  // filter by desc for windows
  if (hasMutiMac(list) && process.platform === 'win32') {
    const info = await getNetworkIFacesInfoByWmic(); // await getNetworkIFacesInfoByIpconfig();

    if (info.stdout) {
      const r = list.filter(item => {
        if (!info.config[item.mac]) return true;
        const desc = info.config[item.mac].desc;
        item.desc = desc;
        return !isVirtualMac('', desc);
      });

      if (r.length > 0) list = r;
    }
  }

  logDebug('[getNetworkIFaces]', list);
  return list;
}

export function getNetworkIFaceOne(iface?: string) {
  return getNetworkIFaces(iface).then(list => list[0]);
}
