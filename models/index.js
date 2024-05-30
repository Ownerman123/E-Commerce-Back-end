// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', // Refers to Product model's primary key
  otherKey: 'tag_id',      // Refers to Tag model's primary key
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'

})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',    // Refers to Tag model's primary key
  otherKey: 'product_id',  // Refers to Product model's primary key
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
