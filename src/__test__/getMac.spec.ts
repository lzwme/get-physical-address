import { getAllMac, getAllPhysicsMac, getMac } from '../getMac';
import { isValidMac } from '../utils';
import { ifacesMock } from './testData.mock';

jest.mock('os', () => {
  return {
    networkInterfaces: () => ifacesMock,
  };
});

describe('getMac.ts', () => {
  it('getAllMac', () => {
    const list = getAllMac();
    expect(Array.isArray(list)).toBeTruthy();
    // it is not filtered by visual mac prefix
    expect(list.includes(ifacesMock.vmware[0].mac)).toBeTruthy();
  });

  it('getAllPhysicsMac', async () => {
    let list = await getAllPhysicsMac();
    expect(Array.isArray(list)).toBeTruthy();
    // it is filtered by visual mac prefix
    expect(list.includes(ifacesMock.vmware[0].mac)).toBeFalsy();

    list = await getAllPhysicsMac('IPv4');
    expect(list.length > 0).toBeTruthy();
    expect(list.includes(ifacesMock.en0[1].mac)).toBeTruthy();

    list = await getAllPhysicsMac('IPv6');
    expect(list.includes(ifacesMock.en0[0].mac)).toBeTruthy();
  });

  it('getMac', async () => {
    let mac = await getMac();
    expect(typeof mac === 'string' && isValidMac(mac)).toBeTruthy();

    // return the ipv4 mac address
    mac = await getMac('en0');
    expect(mac).toBe(ifacesMock.en0[1].mac);

    mac = await getMac('abc');
    expect(mac).toBeUndefined();
  });
});
