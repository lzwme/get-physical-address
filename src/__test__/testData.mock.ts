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
      cidr: '::1/128',
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
