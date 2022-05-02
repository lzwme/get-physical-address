#!/usr/bin/env node
"use strict";
// @ts-check
const { getAllMac, getAllPhysicsMac, getMac } = require("../build/main");
function help() {
    console.log(['USEAGE:', `\tgmac <--all> <--one [iface]>`, `\nexample:`, `\tgmac --all`, `\tgmac --one`, `\tgmac --one en0`].join('\n'));
}
async function start(argv = process.argv.slice(2)) {
    try {
        if (argv.includes('--debug'))
            process.env.DEBUG = '*';
        if (argv.includes('--all')) {
            console.log('getAllMac:', getAllMac());
            getAllPhysicsMac.then(list => console.log('getAllPhysicsMac:', list));
            return;
        }
        const index = argv.indexOf('--one');
        if (index > -1) {
            const iface = argv[index + 1];
            return getMac(iface).then(mac => {
                console.log(`Mac address${iface ? ` for ${iface}` : ''}:`, mac);
            })
        }
        help();
    }
    catch (error) {
        console.error((0, require('os').networkInterfaces)());
        throw error;
    }
}
start();
