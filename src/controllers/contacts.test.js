const contact = {
  first_name: 'hard',
  last_name: 'jar',
  phone_number: '0705221421',
  password: 'secret',
};

describe('Contacts', () => {
  test('post /contacts/create returns 201 with valid data', done => {
    agent
      .post('/api/v1/contacts/create')
      .send(contact)
      .expect(201)
      .end(done);
  });

  test('post /contacts/create returns 422 with invalid data', done => {
    agent
      .post('/api/v1/contacts/create')
      .send({})
      .expect(422)
      .end(done);
  });
});
