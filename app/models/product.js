const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: 'id_user',
      });
      Product.hasMany(models.Offer, {
        foreignKey: 'id_product',
      });
      Product.hasMany(models.History, {
        foreignKey: 'id_product',
      });
    }
  }
  Product.init({
    id_user: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    product_price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.ARRAY(DataTypes.TEXT),
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
