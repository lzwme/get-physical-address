import { exec, type ExecException, type ExecOptions } from 'child_process';
import { ObjectEncodingOptions } from 'fs';
import process from 'process';
import { formatMac, isVirtualMac, logDebug } from './utils';

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

export async function getNetworkIFacesInfoByWmic() {
  const config: { [mac: string]: IpconfigNIFItem } = {};
  let stdout = '';

  if (process.platform === 'win32') {
    const keyMap = { MACAddress: 'mac', Description: 'desc' };
    const cmd = `wmic nic get MACAddress,Description /format:list`;
    const info = await execPromisfy(cmd);
    const lines = info.stdout.split('\n').filter(d => d.includes('='));

    stdout = info.stdout;
    if (lines[0]) {
      let item: Record<string, string> = {};
      const setToConfig = () => {
        if (item.mac) {
          item.mac = formatMac(item.mac);
          if (!config[item.mac] || !isVirtualMac('', item.desc)) config[item.mac] = item;
        }
        item = {};
      };

      for (const line of lines) {
        let [key, value] = line.split('=').map(d => d.trim());
        key = keyMap[key] || key.toLowerCase();

        if (item[key]) setToConfig();

        item[key] = value;
      }
      setToConfig();
    }

    if (stdout) logDebug(`[getNetworkIFacesInfoByWmic]`, stdout, config);
  }

  return { stdout, config };
}
