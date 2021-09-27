/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '..';

chai.use(chaiHttp);

describe('Add and verify Account', () => {
  it('should successfully add new account', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation {
          addAccount(account_name: "NNADIKA CHIMA", account_number: "6033101538", bank_code: "082") {
            account_name
            account_number
            bank_code
            bank_name
            is_verified
          }
        }`
      });
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.addAccount.account_name).to.be.a('string');
    expect(response.body.data.addAccount.account_number).to.be.a('string');
  });
  it('should fail if bank account does not exist', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `mutation {
          addAccount(account_name: "NNADIKA CHIMA", account_number: "0000000000", bank_code: "082") {
            account_name
            account_number
            bank_code
            bank_name
            is_verified
          }
      }`
      });
    expect(response.body.errors).to.be.a('array');
  });
});

describe('Get Account', () => {
  it('get account from database', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `query {
          getAccount(account_number: "6033101538", bank_code: "082")
        }`
      });
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
  });

  it('should fail if account does not exist', async () => {
    const response = await chai
      .request(server)
      .post('/graphql')
      .send({
        query: `query {
          getAccount(account_number: "000000", bank_code: "082")
        }`
      });
    expect(response).to.have.status(404);
    expect(response.body.errors).to.be.a('array');
    expect(response.body.errors[0].message).to.be.a('string');
    expect(response.body.errors[0].message).to.eql('account not found in our database!');
  });
});
