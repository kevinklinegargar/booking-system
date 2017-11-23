'use strict';
var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    name:{
        type:String
    }
});
var Category = mongoose.model('Category', CategorySchema);

Category.getAll = function(callback){

	Category.find({},{},callback);

}
Category.create = function(data,callback){
	let book = new Category(data);
	book.save(callback);
}

export{ Category };