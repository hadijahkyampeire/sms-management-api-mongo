const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const validate = require('../utils/validation');
const Contact = require('../models/contact');
const phoneNumberRule = require('../utils/phoneNumberRule');

module.exports = {
  async login(req, res) {
    const { phone_number, password } = await validate(req, {
      phone_number: phoneNumberRule,
      password: 'required|min:6',
    });
    const contact = await Contact.findOne({ phone_number });

    if (contact && bcrypt.compareSync(password, contact.password)) {
      const { phone_number, _id: contact_id } = contact;
      const payload = {
        phone_number,
        contact_id,
      };
      return res.send({
        message: 'You were successfully authenticated',
        token: jwt.sign({ payload }, process.env.SECRET, { expiresIn: 86400 }),
      });
    }

    return res.status(401).send({ error: 'Incorrect phone number or password' });
  },
};
