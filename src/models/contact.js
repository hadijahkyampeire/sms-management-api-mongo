const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Message = require('../models/message');
//contacts schema
const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//hashing a password before saving it to the database
contactSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

contactSchema.post('remove', async function(next) {
  //listen for when a contact is being deleted and remove  all messages associated with it
  await Message.deleteMany({ sender: this.phone_number });
  await Message.updateMany({ receiver: null });
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
