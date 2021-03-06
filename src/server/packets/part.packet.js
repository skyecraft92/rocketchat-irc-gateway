import log from "../../logger";

import util from "util";

function partPacket(conn, nick, channel) {
  conn.sendCommandPrefix("PART", {
    nick,
    user: nick,
    host: conn.server.serverHost
  }, channel);
}

async function onPartCommand(conn, params, prefix) {
  let channel = params[0];

  try {
    await conn.rocketchat.leaveRoom(channel);
  } catch (e) {
    log.error(e.stack || util.inspect(e, {
      colors: true,
      depth: null
    }));
  }
}

module.exports = (server) => {
  server.addPacketSender("part", partPacket);
  server.addPacketHandler("part", onPartCommand);
};