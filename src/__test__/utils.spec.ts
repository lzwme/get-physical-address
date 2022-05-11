import { formatMac, hasMac, hasMutiMac, isDebug, isMac, isValidMac, isVirtualMac, isZeroMac, logDebug } from '../utils';
import { ifacesMock } from './testData.mock';

describe('utils', () => {
  it('isDebug', () => {
    process.env.DEBUG = '*';
    expect(isDebug()).toBeTruthy();
    process.env.DEBUG = 'GPMA';
    expect(isDebug()).toBeTruthy();
    process.env.DEBUG = '';
    expect(isDebug()).toBeFalsy();
  });

  it('logDebug', () => {
    let debugCount = 0;
    globalThis.logger = {
      debug: () => debugCount++,
    };
    logDebug('test');
    expect(debugCount === 0).toBeTruthy();

    process.env.GPA_DEBUG = '1';
    logDebug('test');
    expect(debugCount > 0).toBeTruthy();
  });

  it('isMac', () => {
    const list = ['00:00:00:00:00:00', 'ab:34:56:78:90:01', 'AB:34:56:78:90:01', '00-00-00-00-00-00', '12-34-56-78-90-01'];
    for (const mac of list) expect(isMac(mac)).toBeTruthy();
  });

  it('hasMac', () => {
    const list = [
      '00:00:00:00:00:00',
      'ab:34:56:78:90:01',
      'AB:34:56:78:90:01',
      '00-00-00-00-00-00',
      'the mac address is 12-34-56-78-90-01.',
    ];
    for (const mac of list) expect(hasMac(mac)).toBeTruthy();
  });

  it('isZeroMac', () => {
    for (const mac of ['00:00:00:00:00:00', '00-00-00-00-00-00']) expect(isZeroMac(mac)).toBeTruthy();
    for (const mac of ['', undefined, void 0, 'AB:34:56:78:90:01', '12-34-56-78-90-01']) expect(isZeroMac(mac)).toBeFalsy();
  });

  it('isVirtualMac', () => {
    for (const mac of ['08:00:27:78:90:01', '00-1C-14-78-90-01']) expect(isVirtualMac(mac)).toBeTruthy();
    for (const mac of ['', undefined, '08:00:27:78', 'a0:01', 'AB:34:56:78:90:01', '00-00-00-00-00-00']) {
      expect(isVirtualMac(mac)).toBeFalsy();
    }
  });

  it('isValidMac', () => {
    for (const mac of ['AB:34:56:78:90:01', '12-34-56-78-90-01']) expect(isValidMac(mac)).toBeTruthy();
    for (const mac of ['', undefined, 'a0:01', '00:00:00:00:00:00', '00-00-00-00-00-00']) expect(isValidMac(mac)).toBeFalsy();
  });

  it('formatMac', () => {
    for (const mac of ['AB:34:56:78:90:01', '12-34-56-78-90-01', '00-00-00-00-00-00'])
      expect(/^[\d:a-z]+$/.test(formatMac(mac))).toBeTruthy();
  });

  it('hasMutiMac', () => {
    expect(hasMutiMac([])).toBeFalsy();
    expect(hasMutiMac(void 0)).toBeFalsy();
    expect(hasMutiMac(ifacesMock.en0 as never)).toBeTruthy();
  });
});
