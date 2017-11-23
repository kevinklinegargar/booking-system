'use strict';
var mongoose = require('mongoose');


var BookSchema = mongoose.Schema(
	{
		book_id:{
			type:String
		},
		title:{
			type:String
		},
		short_desc:{
			type:String
		},
		description: {
			type:String
		},
		author: {
			type: String
		},
		category: {
			type: String
		},
		date:{
			type:Date
		}
	},
	{ timestamps: { createdAt: 'created_at',updatedAt: 'update_at'  }}
);

var Book = mongoose.model('Book', BookSchema);

Book.getAll = function(callback){

		Book.find({},{}).sort({ title: 1 }).exec(callback);

}
Book.getById = function(id,callback){
	Book.findById(id,callback);
}
Book.create = function(data,callback){
	let book = new Book(data);
	book.save(callback);
}
Book.update = function(data,callback){
	Book.findById(data._id, function (err, book) {
		if (err) throw(err);
		book.book_id = data.book_id;
		book.title = data.title;
		book.short_desc = data.short_desc;
		book.description = data.description;
		book.author = data.author;
		book.category = data.category;
		book.date = data.date;
		book.save(callback);
	});
}


export{ Book };