[![@lzwme/get-physical-address](https://nodei.co/npm/@lzwme/get-physical-address.png)][npm-url]

# @lzwme/get-physical-address

[![build status](https://github.com/lzwme/get-physical-address/actions/workflows/node-ci.yml/badge.svg?branch=main)](https://github.com/lzwme/get-physical-address/actions/workflows/node-ci.yml)
[![NPM version][npm-badge]][npm-url]
[![node version][node-badge]][node-url]
[![license MIT](https://img.shields.io/github/license/lzwme/get-physical-address)](https://github.com/lzwme/get-physical-address)

[![npm download][download-badge]][download-url]
[![GitHub issues][issues-badge]][issues-url]
[![GitHub forks][forks-badge]][forks-url]
[![GitHub stars][stars-badge]][stars-url]


[简体中文](./.github/README_zh-CN.md)

Try get the physical address(hardware MAC address) of the hosts network interfaces. Filter the virtual machine network card, VPN virtual network card, etc., and return the real MAC address information of the physical network card.

## Background

In Node.js or electron applications, it may be necessary to use MAC address and IP address as important marks to identify the uniqueness of the device, and use them as the basis for establishing the blacklist / whitelist mechanism of user equipment.

Via the API of `os.networkInterfaces()` you can easily get the information of the device network card.

However, when the virtual machine and VPN are enabled on the user's machine, the number of network cards returned by the API may be very large. At this time, it is necessary to identify the real physical network card to ensure that the information of the only physical network card can be accurately returned no matter whether the virtual network card is used or not, so as to avoid misjudgment caused by identification error.

## Install

```bash
npm i @lzwme/get-physical-address
# use yarn
yarn add @lzwme/get-physical-address
```

## Usage

Example：

```ts
import { getNetworkIFaceOne, getMac, isVirtualMac } from '@lzwme/get-physical-address';

getNetworkIFaceOne().then(item => {
  console.log(`isVirtualMac: ${isVirtualMac(item.mac, item.desc)}. the MAC address is ${item.mac}, the IP address is ${item.address}`)
});

getMac().then(mac => console.log(`the MAC address is ${mac}`));
getMac('en0').then(mac => console.log(`the MAC address for en0 is ${mac}`));
```

Example for some other API：

```ts
import { isMac, hasMac, isValidMac, isVirtualMac, formatMac, getAllPhysicsMac } from '@lzwme/get-physical-address';


isMac('aa-bb-cc-dd-ee-ff'); // true
hasMac('The MAC address is aa-bb-cc-dd-ee-ff'); // true
isMac('00:00:00:00:00:00'); // true
isValidMac('00:00:00:00:00:00'); // false
formatMac('AA-BB-CC-DD-EE-FF'); // aa:bb:cc:dd:ee:ff
isVirtualMac('00:0c:29:ae:ce'); // true

getAllMac().then(list => console.log(list));
getAllPhysicsMac('IPv4').then(list => console.log(list));
```

## API

### `getMac`

- `getMac(iface?: string): Promise<string>`
- `getAllPhysicsMac(family?: 'IPv4' | 'IPv6'): Promise<string[]>`
- `getAllMac(): string[]` Filtered by `internal=true` and `isZeroMac(macAdress)`

### `getNetworkInterface`

- `getNetworkIFaces(iface?: string, family?: 'IPv4' | 'IPv6'): Promise<os.NetworkInterfaceInfo[]>`
- `getNetworkIFaceOne(iface?: string): Promise<os.NetworkInterfaceInfoIPv4 | os.NetworkInterfaceInfoIPv6>`

### `utils`

- `isMac(mac: string): boolean`
- `hasMac(str: string): boolean`
- `isZeroMac(mac: string): boolean`
- `isValidMac(mac: string): boolean`
- `formatMac(mac: string): string`

## Development

```bash
git clone https://github.com/lzwme/get-physical-address
yarn install
npm link
yarn dev
```

## License

`@lzwme/get-physical-address` is released under the MIT license.

该插件由[志文工作室](https://lzw.me)开发和维护。


[stars-badge]: https://img.shields.io/github/stars/lzwme/get-physical-address.svg
[stars-url]: https://github.com/lzwme/get-physical-address/stargazers
[forks-badge]: https://img.shields.io/github/forks/lzwme/get-physical-address.svg
[forks-url]: https://github.com/lzwme/get-physical-address/network
[issues-badge]: https://img.shields.io/github/issues/lzwme/get-physical-address.svg
[issues-url]: https://github.com/lzwme/get-physical-address/issues
[npm-badge]: https://img.shields.io/npm/v/@lzwme/get-physical-address.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@lzwme/get-physical-address
[node-badge]: https://img.shields.io/badge/node.js-%3E=_12.0.0-green.svg?style=flat-square
[node-url]: https://nodejs.org/download/
[download-badge]: https://img.shields.io/npm/dm/@lzwme/get-physical-address.svg?style=flat-square
[download-url]: https://npmjs.org/package/@lzwme/get-physical-address
[bundlephobia-url]: https://bundlephobia.com/result?p=@lzwme/get-physical-address@latest
[bundlephobia-badge]: https://badgen.net/bundlephobia/minzip/@lzwme/get-physical-address@latest
