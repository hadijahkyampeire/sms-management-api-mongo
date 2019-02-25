var mongoose = require('mongoose');

//Message schema/table
var messageScheme = mongoose.Schema({
  sender: { type: String, required: true },
  // the user(sender), could be deleted, lets make it nullable
  receiver: { type: String, required: false },
  message: { type: String, required: true },
  status: { type: String, default: 'sent' },
  created: { type: Date, default: Date.now },
});

messageScheme.static('forContact', function(phoneNumber, filters = {}) {
  return this.findOne({
    ...filters,
    $or: [{ receiver: phoneNumber }, { sender: phoneNumber }],
  });
});

module.exports = mongoose.model('Message', messageScheme);
