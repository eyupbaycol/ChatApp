const shortId = require("shortid");
const _ = require("lodash");
const redisClient = require("./redisClient");
function Messages() {
  this.client = redisClient.getClient();
}

module.exports = new Messages();

Messages.prototype.upsert = function ({ roomId, message, username, surname }) {
  this.client.hset(
    "messages:" + roomId,
    shortId.generate(),
    JSON.stringify({
      username,
      surname,
      message,
      when: Date.now(),
    }),
    (err) => {
      if (err) {
        console.log(error);
      }
    }
  );
};

Messages.prototype.list = function (rommId, callback) {
  let messageList = [];
  this.client.hgetall("messages:" + rommId, function (err, messages) {
    if (err) {
      console.error(err);
      return callback([]);
    }
    for (let message in messages) {
      messageList.push(JSON.parse(messages[message]));
    }
    return callback(_.orderBy(messageList, "when", "asc"));
  });
};
