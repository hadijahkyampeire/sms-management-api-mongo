const { rule } = require('indicative');
const Message = require('../models/message');
const Contact = require('../models/contact');
const validate = require('../utils/validation');

const getSingleMessage = async req => {
  const { id } = req.params;
  const { phone_number } = req.currentContact;
  return await Message.forContact(phone_number, { _id: id });
};

const messageRules = () => ({
  receiver: [rule('required'), rule('exists', [Contact, 'phone_number'])],
  message: 'required|max:480',
});

module.exports = {
  async store(req, res) {
    const { receiver, message } = await validate(req, messageRules());

    const sender = req.currentContact.phone_number;
    if (receiver === sender) {
      return res.status(400).json({ error: 'receiver and sender have to be different' });
    }
    const created = await Message.create({ receiver, message, sender });
    return res.status(201).json(created);
  },

  //get all messages by receiver or sender
  async index(req, res) {
    const messages = await Message.forContact(req.currentContact.phone_number);
    return res.json(messages);
  },

  // Get message by id
  async show(req, res) {
    const message = await getSingleMessage(req);
    return message ? res.json(message) : res.status(404).json({ error: 'message not found' });
  },

  // Delete a message by id if you are a sender or receiver
  async destroy(req, res) {
    const message = await getSingleMessage(req);

    if (!message) {
      return res.status(400).json({ error: "message doesn't exist" });
    }
    await message.delete();

    return res.json({ error: 'message was deleted successfully' });
  },

  // update a message when you are a sender
  async update(req, res) {
    const data = await validate(req, messageRules());
    const message = await getSingleMessage(req);

    if (!message) {
      res.status(404).json({ error: "Message doesn't exist" });
    }
    const updated = await message.update(data);
    return res.json({ message: `${updated.nModified} attributes were updated` });
  },
};
