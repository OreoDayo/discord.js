'use strict';

const Action = require('./Action');

class MessageUpdateAction extends Action {
  handle(data) {
    const channel = this.getChannel(data);
    if (channel) {
      if (channel.type === 'voice') return {};
      const { id, channel_id, guild_id, author, timestamp, type } = data;
      const message = this.getMessage({ id, channel_id, guild_id, author, timestamp, type }, channel);
      if (message) {
        const old = message.patch(data);
        return {
          old,
          updated: message,
        };
      }
    }

    return {};
  }
}

module.exports = MessageUpdateAction;
