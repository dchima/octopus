module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('accounts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    account_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_number: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    bank_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bank_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    paystack_account_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('accounts')
};
