const contact = {
  first_name: 'hard',
  last_name: 'jar',
  phone_number: '0705221421',
  password: 'secret',
};

describe('Authentication', () => {
  it('post api/v1/authentication throws a 401 exception for wrong user name and password', done => {
    agent
      .post('/api/v1/authentication')
      .send({ phone_number: '0704311311', password: 'wrong password' })
      .expect(401)
      .end(done);
  });
});
