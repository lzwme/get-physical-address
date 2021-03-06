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
  `    Host Name . . . . . . . . . . . . : PCNAME`, // ??????????????????????????????
  `    Primary Dns Suffix . . . . . . . :`, // ??? DNS ??????
  `    Node Type . . . . . . . . . . . . : Unknown`, // ????????????
  `    IP Routing Enabled. . . . . . . . : Yes`, // IP????????????????????????
  `    WINS Proxy Enabled. . . . . . . . : No`, // WINS????????????????????????
  `   `,
  `Ethernet adapter:`, // ????????????
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
  `?????????????????? VMware Network Adapter VMnet1:

   ??????????????? DNS ?????? . . . . . . . :
   ??????. . . . . . . . . . . . . . . : VMware Virtual Ethernet Adapter for VMnet1
   ????????????. . . . . . . . . . . . . : 00-50-56-C0-00-01
   DHCP ????????? . . . . . . . . . . . : ???
   ?????????????????????. . . . . . . . . . : ???
   ???????????? IPv6 ??????. . . . . . . . : fe80::1935:e4f6:3781:4d4c%19(??????)
   IPv4 ?????? . . . . . . . . . . . . : 192.168.160.1(??????)
   ????????????  . . . . . . . . . . . . : 255.255.255.0
   ????????????. . . . . . . . . . . . . :
   DHCPv6 IAID . . . . . . . . . . . : 83906646
   DHCPv6 ????????? DUID  . . . . . . . : 00-01-00-01-1F-75-64-25-C8-5B-76-70-B3-98
   DNS ?????????  . . . . . . . . . . . : fec0:0:0:ffff::1%1
                                       fec0:0:0:ffff::2%1
                                       fec0:0:0:ffff::3%1
   TCPIP ?????? NetBIOS  . . . . . . . : ?????????

?????????????????? VMware Network Adapter VMnet8:

   ??????????????? DNS ?????? . . . . . . . :
   ??????. . . . . . . . . . . . . . . : VMware Virtual Ethernet Adapter for VMnet8
   ????????????. . . . . . . . . . . . . : 00-50-56-C0-00-08
   DHCP ????????? . . . . . . . . . . . : ???
   ?????????????????????. . . . . . . . . . : ???
   ???????????? IPv6 ??????. . . . . . . . : fe80::55a5:a92f:74b4:6fec%15(??????)
   IPv4 ?????? . . . . . . . . . . . . : 192.168.87.1(??????)
   ????????????  . . . . . . . . . . . . : 255.255.255.0
   ????????????. . . . . . . . . . . . . :
   DHCPv6 IAID . . . . . . . . . . . : 285233238
   DHCPv6 ????????? DUID  . . . . . . . : 00-01-00-01-1F-75-64-25-C8-5B-76-70-B3-98
   DNS ?????????  . . . . . . . . . . . : fec0:0:0:ffff::1%1
                                       fec0:0:0:ffff::2%1
                                       fec0:0:0:ffff::3%1
   TCPIP ?????? NetBIOS  . . . . . . . : ?????????`,
].join('\n');

export const wmicNicStdout = [
  `MACAddress=${ifacesMock.en0[1].mac}    \nName=Realtek PCIe FE Family Controller `,
  `MACAddress=1C:1B:B5:9B:FF:CC   \nName=Intel(R) Wireless-AC 9462   `,
  `MACAddress=${ifacesMock.vmware[0].mac}   \nName=Visual Adpter`,
  `MACAddress=${ifacesMock.vmware[1].mac}   \nName=Visual Vmware Adpter 0`,
].join('\n');
