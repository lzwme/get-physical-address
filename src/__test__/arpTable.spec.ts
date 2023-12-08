/*
 * @Author: renxia
 * @Date: 2023-12-08 10:11:08
 * @LastEditors: renxia
 * @LastEditTime: 2023-12-08 11:59:50
 * @Description:
 */
import { getArpIpByMac, getArpMacByIp, getArpTable } from '../arpTable';
import { ifacesMock, arpANStdout } from './testData.mock';

let platform: keyof typeof arpANStdout = 'win32';

jest.mock('os', () => ({
  networkInterfaces: () => ifacesMock,
}));
jest.mock('child_process', () => ({
  execSync() {
    return arpANStdout[platform];
  },
}));

jest.mock('process', () => {
  return {
    get platform() {
      return platform;
    },
  };
});

describe('getArpTable.ts', () => {
  beforeAll(() => {
    console.debug = () => void 0;
    console.error = () => void 0;
    process.env.DEBUG = '*';
  });

  it('getArpTable', async () => {
    platform = 'win32';
    let info = await getArpTable();
    expect(Array.isArray(info.table)).toBeTruthy();

    platform = 'mac';
    info = await getArpTable();
    expect(Array.isArray(info.table)).toBeTruthy();
    expect(info.table.every(d => d.type === 'unknown')).toBeTruthy();

    platform = 'linux';
    info = await getArpTable();
    expect(Array.isArray(info.table)).toBeTruthy();
    expect(info.table.some(d => d.mac === '<incomplete>')).toBeTruthy();
    expect(info.table.every(d => d.type === 'unknown')).toBeTruthy();

    info = await getArpTable(arpANStdout.mac);
    expect(info.table.some(d => d.mac === '<incomplete>')).toBeFalsy();
  });

  it('getArpMacByIp', async () => {
    platform = 'win32';
    let mac = await getArpMacByIp('10.10.1.1');
    expect(mac).toBe('dc:ef:80:37:aa:ff');

    mac = await getArpMacByIp('10.10.1.0');
    expect(mac).toBe('');
  });

  it('getArpIpByMac', async () => {
    platform = 'win32';
    let ip = await getArpIpByMac('dc-ef-80-37-aa-ff');
    expect(ip[0]).toBe('10.10.1.1');

    ip = await getArpIpByMac('dc-ef-80-37');
    expect(ip.length > 1).toBeTruthy();

    ip = await getArpIpByMac('dc:ef:80:37');
    expect(ip[0]).toBe('10.10.1.1');
  });
});
