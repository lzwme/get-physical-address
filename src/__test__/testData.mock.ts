export const ifacesMock = {
  lo0: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8',
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '::1/12',
      scopeid: 0,
    },
    {
      address: 'fe80::1',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: 'fe80::1/64',
      scopeid: 1,
    },
  ],
  en1: [
    {
      address: 'fe80::aede:48ff:fe00:1122',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: 'ac:de:48:00:bb:cc',
      internal: false,
      cidr: 'fe80::aede:48ff:fe00:1122/64',
      scopeid: 4,
    },
  ],
  en0: [
    {
      address: 'fe80::ccc:d04d:ff59:aa99',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: 'f0:18:98:9e:bb:cc',
      internal: false,
      cidr: 'fe80::ccc:d04d:ff59:aa99/64',
      scopeid: 6,
    },
    {
      address: '192.168.31.100',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '00:1d:7d:71:a8:d6',
      internal: false,
      cidr: '192.168.31.100/24',
    },
  ],
  awdl0: [
    {
      address: 'fe80::b4af:b5ff:fe40:aa8b',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: 'b6:af:b5:40:aa:bb',
      internal: false,
      cidr: 'fe80::b4af:b5ff:fe40:aa8b/64',
      scopeid: 10,
    },
  ],
  vboxnet1: [
    {
      address: '192.168.31.110',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '00:1d:7d:71:a8:ff',
      internal: false,
      cidr: '192.168.31.110/24',
    },
  ],
  vmware: [
    {
      address: '192.168.31.120',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '00:0c:29:71:a8:ff',
      internal: false,
      cidr: '192.168.31.120/24',
    },
    {
      address: '192.168.31.111',
      netmask: '255.255.255.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: false,
      cidr: '192.168.31.111/24',
    },
    {
      address: 'fe80::1',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: 'fe80::1/64',
      scopeid: 1,
    },
  ],
};

export const ipconfigStdout = [
  `Windows IP Configuration`,
  `    Host Name . . . . . . . . . . . . : PCNAME`, // 域中计算机名、主机名
  `    Primary Dns Suffix . . . . . . . :`, // 主 DNS 后缀
  `    Node Type . . . . . . . . . . . . : Unknown`, // 节点类型
  `    IP Routing Enabled. . . . . . . . : Yes`, // IP路由服务是否启用
  `    WINS Proxy Enabled. . . . . . . . : No`, // WINS代理服务是否启用
  `   `,
  `Ethernet adapter:`, // 本地连接
  `    Connection-specific DNS Suffix :`,
  `    Description . . . . . . . . . . . : Realtek RTL8168/8111 PCI-E Gigabi`,
  `    Physical Address. . . . . . . . . : ${ifacesMock.en0[1].mac.replace(/:/g, '-').toUpperCase()}`,
  `    DHCP Enabled. . . . . . . . . . . : No`,
  `    IP Address. . . . . . . . . . . . : ${ifacesMock.en0[1].address}(Preferred)`,
  `    Subnet Mask . . . . . . . . . . . : 255.255.255.0`,
  `    Default Gateway . . . . . . . . . : 192.168.90.254`,
  `    DHCP Server. . . . . . . .. . . . : 192.168.90.88`,
  `    DNS Servers . . . . . . . . . . . : 114.114.114.114`,
  `                                        8.8.8.8`,
  `    Lease Obtained. . . . . . . . . . : 2022-5-1 8:13:54`,
  `    Lease Expires . . . . . . .. . . .: 2022-5-10 8:13:54`,
  `    abc . . . . . . .. . . .: Yes`,
  `以太网适配器 VMware Network Adapter VMnet1:

   连接特定的 DNS 后缀 . . . . . . . :
   描述. . . . . . . . . . . . . . . : VMware Virtual Ethernet Adapter for VMnet1
   物理地址. . . . . . . . . . . . . : 00-50-56-C0-00-01
   DHCP 已启用 . . . . . . . . . . . : 否
   自动配置已启用. . . . . . . . . . : 是
   本地链接 IPv6 地址. . . . . . . . : fe80::1935:e4f6:3781:4d4c%19(首选)
   IPv4 地址 . . . . . . . . . . . . : 192.168.160.1(首选)
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :
   DHCPv6 IAID . . . . . . . . . . . : 83906646
   DHCPv6 客户端 DUID  . . . . . . . : 00-01-00-01-1F-75-64-25-C8-5B-76-70-B3-98
   DNS 服务器  . . . . . . . . . . . : fec0:0:0:ffff::1%1
                                       fec0:0:0:ffff::2%1
                                       fec0:0:0:ffff::3%1
   TCPIP 上的 NetBIOS  . . . . . . . : 已启用

以太网适配器 VMware Network Adapter VMnet8:

   连接特定的 DNS 后缀 . . . . . . . :
   描述. . . . . . . . . . . . . . . : VMware Virtual Ethernet Adapter for VMnet8
   物理地址. . . . . . . . . . . . . : 00-50-56-C0-00-08
   DHCP 已启用 . . . . . . . . . . . : 否
   自动配置已启用. . . . . . . . . . : 是
   本地链接 IPv6 地址. . . . . . . . : fe80::55a5:a92f:74b4:6fec%15(首选)
   IPv4 地址 . . . . . . . . . . . . : 192.168.87.1(首选)
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . :
   DHCPv6 IAID . . . . . . . . . . . : 285233238
   DHCPv6 客户端 DUID  . . . . . . . : 00-01-00-01-1F-75-64-25-C8-5B-76-70-B3-98
   DNS 服务器  . . . . . . . . . . . : fec0:0:0:ffff::1%1
                                       fec0:0:0:ffff::2%1
                                       fec0:0:0:ffff::3%1
   TCPIP 上的 NetBIOS  . . . . . . . : 已启用`,
].join('\n');

export const wmicNicStdout = [
  `MACAddress=${ifacesMock.en0[1].mac}    \nName=Realtek PCIe FE Family Controller `,
  `MACAddress=1C:1B:B5:9B:FF:CC   \nName=Intel(R) Wireless-AC 9462   `,
  `MACAddress=${ifacesMock.vmware[0].mac}   \nName=Visual Adpter`,
  `MACAddress=${ifacesMock.vmware[1].mac}   \nName=Visual Vmware Adpter 0`,
].join('\n');

const arpAWinStdout = `接口: 10.10.1.108 --- 0xc
Internet 地址         物理地址              类型
10.10.1.1           dc-ef-80-37-aa-ff     动态
10.10.1.2           dc-ef-80-37-cc-ff     动态
10.10.1.3           00-00-ff-00-ff-ff     动态
10.10.1.43          00-00-ff-00-ff-ff     动态
10.10.1.112         00-00-ff-00-ff-ff     动态
10.10.1.255         ff-ff-ff-ff-ff-ff     静态
224.0.0.2             01-00-ff-00-ff-f2     静态
224.0.0.22            01-00-ff-00-ff-f6     静态
224.0.0.251           01-00-ff-00-ff-fb     静态
224.0.0.252           01-00-ff-00-ff-fc     静态
239.255.255.250       01-00-ff-7f-ff-fa     静态
255.255.255.255       ff-ff-ff-ff-ff-ff     静态

接口: 172.29.64.1 --- 0x15
Internet 地址         物理地址              类型
172.29.79.255         ff-ff-ff-ff-ff-ff     静态
224.0.0.2             01-00-ff-00-ff-f2     静态
224.0.0.22            01-00-ff-00-ff-f6     静态
224.0.0.251           01-00-ff-00-ff-fb     静态
224.0.0.252           01-00-ff-00-ff-fc     静态
239.255.255.250       01-00-ff-7f-ff-ff     静态
255.255.255.255       ff-ff-ff-ff-ff-ff     静态`;

const arpANMacStdout = `? (10.10.2.2) at dc:ef:80:37:ff:ff on en1 ifscope [ethernet]
? (10.10.2.3) at 0:0:5e:0:1:ff on en1 ifscope [ethernet]
? (10.10.2.51) at a0:80:69:96:ff:ff on en1 ifscope [ethernet]
? (10.10.2.54) at a4:cf:99:96:ff:ff on en1 ifscope [ethernet]
? (10.10.2.96) at 3c:22:fb:52:ff:ff on en1 ifscope [ethernet]
? (10.10.2.121) at 62:0:34:b8:ff:ff on en1 ifscope [ethernet]
? (10.10.2.135) at 6c:b1:33:9c:ff:ff on en1 ifscope [ethernet]
? (10.10.2.182) at 3c:6:30:0:ff:ff on en1 ifscope [ethernet]
? (10.10.2.255) at ff:ff:ff:ff:ff:ff on en1 ifscope [ethernet]
? (224.0.0.251) at 1:0:5e:0:0:ff on en1 ifscope permanent [ethernet]
? (239.255.255.250) at 1:0:5e:7f:ff:ff on en1 ifscope permanent [ethernet]`;

const arpANLinuxStdout = `? (10.12.11.2) at 70:79:b3:48:ff:ff [ether] on eno1
? (172.17.125.49) at <incomplete> on docker0
? (10.12.11.40) at 18:66:da:e8:ff:ff [ether] on eno1
? (10.12.11.54) at 1c:98:ec:27:ff:ff [ether] on eno1
? (172.17.0.2) at 02:42:ac:11:ff:ff [ether] on docker0
? (172.17.12.1) at <incomplete> on docker0
? (10.12.11.46) at 14:18:77:3c:ff:ff [ether] on eno1
? (10.12.11.3) at 00:00:0c:9f:ff:ff [ether] on eno1
? (10.12.11.41) at 18:66:da:e8:ff:ff [ether] on eno1
? (10.12.11.55) at 1c:98:ec:27:ff:ff [ether] on eno1
? (10.12.11.21) at 40:f2:e9:9d:ff:ff [ether] on eno1
? (172.17.0.3) at 02:42:ac:11:ff:ff [ether] on docker0
? (10.12.11.1) at 70:79:b3:48:ff:ff [ether] on eno1
? (10.12.11.47) at 14:18:77:37:ff:ff [ether] on eno1
? (10.12.11.59) at 94:18:82:6d:ff:ff [ether] on eno1
? (10.12.11.239) at 00:0c:29:44:ff:ff [ether] on eno1`;

export const arpANStdout = {
  win32: arpAWinStdout,
  mac: arpANMacStdout,
  linux: arpANLinuxStdout,
};
