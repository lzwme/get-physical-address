import { isValidMac } from '../utils';
import { ifacesMock, wmicNicStdout, ipconfigStdout } from './testData.mock';
import { getNetworkIFaceOne, getNetworkIFaces } from '../getNetworkInteraces';
import { getNetworkIFacesInfoByWmic } from '../getIFacesByExec';
import { getNetworkIFacesInfoByIpconfig } from '../getIFacesByIpconfig';

jest.mock('os', () => ({
  networkInterfaces: () => ifacesMock,
}));
jest.mock('child_process', () => ({
  exec(cmd, _options, callback: (...a) => void) {
    callback('error for test', cmd.startsWith('wmic') ? wmicNicStdout : Buffer.from(ipconfigStdout));
  },
  execSync(cmd: string) {
    return cmd.startsWith('wmic') ? wmicNicStdout : ipconfigStdout;
  },
}));

let platform = 'win32';
jest.mock('process', () => {
  return {
    get platform() {
      return platform;
    },
  };
});

describe('getIFacesByExec', () => {
  beforeAll(() => {
    console.debug = () => void 0;
    console.error = () => void 0;
    process.env.DEBUG = '*';
  });

  it('getNetworkIFacesInfoByIpconfig', async () => {
    platform = 'linux';
    let info = await getNetworkIFacesInfoByIpconfig();
    expect(Object.keys(info.config).length).toBe(0);

    platform = 'win32';
    info = await getNetworkIFacesInfoByIpconfig();
    expect(Object.keys(info.config).length > 0).toBeTruthy();
  });

  it('getNetworkIFacesInfoByWmic', async () => {
    platform = 'linux';
    let info = await getNetworkIFacesInfoByWmic();
    expect(Object.keys(info.config).length).toBe(0);

    platform = 'win32';
    info = await getNetworkIFacesInfoByWmic();
    expect(Object.keys(info.config).includes(ifacesMock.en0[1].mac)).toBeTruthy();
  });
});

describe('getNetworkInfo.ts', () => {
  it('getNetworkIFaces', async () => {
    let list = await getNetworkIFaces();
    expect(Array.isArray(list)).toBeTruthy();
    // en0 have high highPriority
    expect(ifacesMock.en0.some(d => d.mac === list[0].mac)).toBeTruthy();

    list = await getNetworkIFaces('', 'IPv4');
    expect(list.length > 0).toBeTruthy();
    expect(list.some(d => d.mac === ifacesMock.en0[1].mac)).toBeTruthy();
    expect(list.every(d => d.family === 'IPv4')).toBeTruthy();

    list = await getNetworkIFaces('', 'IPv6');
    expect(list.some(d => d.mac === ifacesMock.en0[0].mac)).toBeTruthy();
    expect(list.every(d => d.family === 'IPv6')).toBeTruthy();

    list = await getNetworkIFaces('abc');
    expect(list.length === 0).toBeTruthy();

    list = await getNetworkIFaces('en0', 'IPv4');
    expect(list.length > 0).toBeTruthy();
  });

  it('getNetworkIFaceOne', async () => {
    let item = await getNetworkIFaceOne();
    expect(isValidMac(item.mac)).toBeTruthy();
    expect(item.mac).toBe(ifacesMock.en0[1].mac);

    // return the ipv4 mac address
    item = await getNetworkIFaceOne('en0');
    expect(item.mac).toBe(ifacesMock.en0[1].mac);

    item = await getNetworkIFaceOne('abc');
    expect(item).toBeUndefined();
  });
});
