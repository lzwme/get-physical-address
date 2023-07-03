[![@lzwme/get-physical-address](https://nodei.co/npm/@lzwme/get-physical-address.png)][npm-url]

# @lzwme/get-physical-address

[![build status](https://github.com/lzwme/get-physical-address/actions/workflows/node-ci.yml/badge.svg?branch=main)](https://github.com/lzwme/get-physical-address/actions/workflows/node-ci.yml)
[![NPM version][npm-badge]][npm-url]
[![node version][node-badge]][node-url]
[![npm download][download-badge]][download-url]
[![GitHub issues][issues-badge]][issues-url]
[![GitHub forks][forks-badge]][forks-url]
[![GitHub stars][stars-badge]][stars-url]
![license MIT](https://img.shields.io/github/license/lzwme/asmd-calc)

获取本机物理网卡 Mac 地址。过滤虚拟机网卡、VPN 虚拟网卡等，返回真实的物理网卡 Mac 地址信息。

## 背景

在 `Node.js` 或 `Electron` 应用中，可能会需要根据 Mac 地址和 IP 地址作为识别设备唯一性的重要标记，并据此作为建立用户设备黑名单/白名单机制的依据。

通过 Node.js 提供的 API `os.networkInterfaces()` 可以很方便的获得设备网卡信息。

但当用户机器上开启了虚拟机、VPN 等时，该 API 返回的网卡数量可能会非常多，此时需要识别真实的物理网卡，以保证在无论是否使用了虚拟网卡上网方式，都能准确的返回唯一物理网卡的信息，以避免识别出现误差而导致误判。

为了尽可能的获取真实物理网卡信息，可以使用的手段主要有：

- 通过常见虚拟机厂商的 Mac 地址前缀过滤。厂商设备 Mac 地址前缀列表参考： https://standards-oui.ieee.org/oui/oui.txt
- 通过系统命令获取网卡描述，按关键字过滤(windows)
  - `ipconfig /all` for windows
  - `wmic nic get` for windows
- 按 Mac 地址、IP 地址格式排序优先级
- more...

## 安装

```bash
npm i @lzwme/get-physical-address
# use yarn
yarn add @lzwme/get-physical-address
```

## 使用

示例：

```ts
import { getNetworkIFaceOne, getMac } from '@lzwme/get-physical-address';

getNetworkIFaceOne().then(item => {
  console.log(`isVirtualMac: ${isVirtualMac(item.mac, item.desc)}. the MAC address is ${item.mac}, the IP address is ${item.address}`)
});

getMac().then(mac => console.log(`the MAC address is ${mac}`));
getMac('en0').then(mac => console.log(`the MAC address for en0 is ${mac}`));
```

更多 API 使用示例：

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
- `getAllMac(): string[]` 仅过滤 `internal=true` 和 MAC 地址为 0 的项

### `getNetworkInterface`

- `getNetworkIFaces(iface?: string, family?: 'IPv4' | 'IPv6'): Promise<os.NetworkInterfaceInfo[]>`
- `getNetworkIFaceOne(iface?: string): Promise<os.NetworkInterfaceInfoIPv4 | os.NetworkInterfaceInfoIPv6>`

### `utils`

- `isMac(mac: string): boolean`
- `hasMac(str: string): boolean`
- `isZeroMac(mac: string): boolean`
- `isValidMac(mac: string): boolean`
- `formatMac(mac: string): string`

## 开发

本地二次开发：

```bash
git clone https://github.com/lzwme/get-physical-address
yarn install
npm link
yarn dev
```

或者 [fork]() 本项目进行代码贡献。

**欢迎贡献想法与代码。**

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
