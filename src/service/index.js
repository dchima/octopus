/**
 * database services
 */
const service = {
  /**
   * add entity to database
   * @param {object} model - database model object
   * @param {object} data - data to be added to database
   * @returns {object} - data added to database
   * @memberof services
   */
  async add(model, data) {
    try {
      const { dataValues: value } = await model.create(data);
      return value;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default service;
