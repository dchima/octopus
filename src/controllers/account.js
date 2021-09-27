import levenshtein_distance from 'js-levenshtein';
import { toolbox } from '../utils';
import db from '../service';
import bankData from '../validations/bankData';

const { responseError } = toolbox;

const { paystack_bank_data } = bankData;

const Account = {

  /**
   * add account to the database
   * @param {object} parent - graphql parent object
   * @param {object} data - graphql input data
   * destructured { account_name, account_number, bank_code }
   * @param {object} req - graphql request
   * @param {object} models - database model
   * @returns {object} account - user account object
   */
  async addAccount(parent, {
    account_name,
    account_number,
    bank_code
  }, { req, models }) {
    const verified_account = await toolbox.verifyAccount(account_number, bank_code);
    if (!verified_account.account_number) return responseError(req.res, 'user with this account could not be verifired', 400);

    /**
     * implementing the levenshtein distance i found online: https://github.com/gustf/js-levenshtein
     * if the distance is less than two, we can happily accept the user input.
     * if it isn't we use paystack's data instead.
     *
     * We will save both bank names if the input name passes the levenshtein distance test
     */
    const distance = levenshtein_distance(verified_account.account_name, account_name);
    const account = await db.add(models.accounts, {
      account_number,
      account_name: distance <= 2 ? account_name : 'none',
      paystack_account_name: verified_account.account_name,
      bank_code,
      bank_name: paystack_bank_data.find((bank) => bank.bank_code === bank_code).bank_name,
      is_verified: distance <= 2,
    });
    return account;
  },

  /**
   * get account
   * @param {object} parent - graphql parent object
   * @param {object} data - graphql input data
   * destructured { account_number, bank_code }
   * @param {object} req - graphql request
   * @param {object} models - database model
   * @returns {object} account - user account object
   */
  async getAccount(parent, { account_number, bank_code}, { req, models }) {
    const account = await models.accounts.findOne({ where: { account_number, bank_code } });
    if (!account) responseError(req.res, 'account not found in our database!', 404);

    /**
     * since I've saved both the paystack bank name and the user's input
     * bank name, we can select which to return to the user.
     */
    return account.account_name === 'none' ? account.paystack_account_name : account.account_name;
  }
};

export default Account;
