const moment = require("moment");

function messageFormat(userName, text, room) {
  return {
    userName: `${userName}`,
    text: `${text}`,
    room: room,
    time: moment().format("h:mm a"),
  };
}

module.exports = messageFormat;
