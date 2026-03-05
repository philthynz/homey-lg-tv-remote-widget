'use strict';

const wakeonlan = require('wakeonlan');

module.exports = {
  async wakeTV({ homey, body }) {
    const settings = homey.widgets && typeof homey.widgets.getSettings === 'function'
      ? homey.widgets.getSettings('lg-tv-remote') || {}
      : {};
    const tvIp = body && body.tv_ip ? body.tv_ip : settings.tv_ip;
    const tvMac = body && body.tv_mac ? body.tv_mac : settings.tv_mac;

    if (!tvIp || !tvMac) {
      throw new Error('Set TV IP and MAC address in widget settings first');
    }

    await wakeonlan(tvMac, {
      address: tvIp,
      port: 9,
    });

    return {
      ok: true,
    };
  },
};
