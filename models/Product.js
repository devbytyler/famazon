var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  ordered: {type: Number, default:0},
  price: Number,
  imageUrl: String
});

ProductSchema.methods.order = function(cb) {
  this.ordered += 1;
  this.save(cb);
};

mongoose.model('Product', ProductSchema);
