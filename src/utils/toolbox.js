import jwt from 'jsonwebtoken';
import Paystack from 'paystack-node';
import env from '../config/env';

const {
  PAYSTACK_SECRET, NODE_ENV
} = env;

const paystack = new Paystack(PAYSTACK_SECRET, NODE_ENV);

const Toolbox = {

  /**
   * response error
   * @param {Response} res - Response object.
   * @param {string} message - error message
   * @param {number} code - error code
   * @returns {object} - returns an error object
   */
  responseError(res, message, code = 500) {
    res.status(code);
    throw new Error(message);
  },

  /**
   * jwt check
   * @param {string} token - user token
   * @returns {object} - returns object of user token values
   */
  jwtCheck(token) {
    try {
      if (token) return jwt.verify(token, env.SECRET);
      return null;
    } catch (error) {
      return null;
    }
  },

  /**
   * verify account via paystack
   * @param {string} account_number - account number to be verified.
   * @param {string} bank_code - bank code of user's bank
   * @returns {object} - returns verified payload
   */
  async verifyAccount(account_number, bank_code) {
    let paystack_response;
    try {
      await paystack.resolveAccountNumber({ account_number, bank_code })
        .then((body) => {
          paystack_response = body.body.data;
        });
      return paystack_response;
    } catch (error) {
      return error.body;
    }
  },

};

export default Toolbox;
