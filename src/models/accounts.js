module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define(
    'accounts',
    {
      account_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      bank_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bank_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
      },
    },
    {}
  );
  accounts.associate = () => {
  };
  return accounts;
};
