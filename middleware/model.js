const Chat = require("../mongoDb/mongooseConnection").Chat;

module.exports = {
  add: (incoming) => {
    return Chat.create(
      {
        user: incoming.user,
        message: incoming.message
      })
  },

  find: () => {
    return Chat.find()
                .skip(Chat.count() - 50)
                .exec()
  },

  deleteAll: () => {
    return Chat.deleteMany({});
  }
}