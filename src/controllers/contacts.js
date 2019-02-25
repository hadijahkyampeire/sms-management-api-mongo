const Contact = require('../models/contact');
const phoneNumberRule = require('../utils/phoneNumberRule');
const validate = require('../utils/validation');
const { rule } = require('indicative');

const makeValidationRules = phoneNumberRules => {
  const commonRules = {
    first_name: 'required|min:3|max:15',
    last_name: 'required|min:3|max:15',
    password: 'required|min:6',
  };
  commonRules.phone_number = phoneNumberRules;
  return commonRules;
};

module.exports = {
  // create a contact
  async store(req, res, next) {
    const data = await validate(
      req,
      makeValidationRules(phoneNumberRule.concat(rule('unique', Contact))),
    );

    contact = await Contact.create(data);
    return res.status(201).send({ contact, message: 'Contact created successfully' });
  },
  //show all contacts
  async index(req, res) {
    const contacts = await Contact.find({});
    return res.json({ contacts });
  },

  //update contact
  async update(req, res, next) {
    const data = await validate(req, makeValidationRules(phoneNumberRule));

    const contact = await Contact.findByIdAndUpdate(req.currentContact.contact_id, data, {
      new: true,
    });
    return res.json({ contact });
  },

  //delete a contact and messages associated
  async destroy(req, res) {
    const { phone_number } = req.currentContact;
    const result = await Contact.findOneAndDelete({ phone_number });
    return result
      ? res.json({ message: 'Contact was successfully deleted' })
      : res.status(422).json({ error: 'Contact no longer exist' });
  },
};
