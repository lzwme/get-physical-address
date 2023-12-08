/*
 * @Author: renxia
 * @Date: 2023-12-08 10:11:08
 * @LastEditors: renxia
 * @LastEditTime: 2023-12-08 11:40:29
 * @Description:
 */
import { getArpTable } from '../arpTable';
// import { getAllMac, getAllPhysicsMac, getMac } from '../getMac';
// import { isValidMac } from '../utils';
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
});
