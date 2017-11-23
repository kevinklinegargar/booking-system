
import { Request, Response, Router } from "express";
import { Book } from './../models/Books';
import { Category } from './../models/Categories';

const bookRouter: Router = Router();

//Get all the books with their categories
bookRouter.get("/all",(req: any,res:any)=>{

	Category.getAll((err,categories)=>{
	
		Book.getAll(function(err,books){
			if(err) throw err;
			
			books.forEach((book,i) => {
			
				categories.forEach((category)=>{
					if(books[i].category == category._id){
						books[i].category = category.name;
					}
				});
				
			});
			res.json(books);	
		});		
	});

});
//get book by book id
bookRouter.get("/id",(req:any,res:any)=>{

	let bookId = req.query.x;
	if(bookId){
		Book.getById(bookId,(err,book)=>{
			res.json(book);	
		});
	}

	
});
//create a new book
bookRouter.post("/create",(req:any,res:any) => {

	let data = req.body;

	let category = req.body.category;
	if(category == "other"){
		Category.create({name:req.body.new_category},(err,new_category)=>{
			if(err) throw err;
				let new_data = {
					book_id:data.book_id,
					title:data.title,
					short_desc:data.short_desc,
					description:data.description,
					author:data.author,
					category:new_category._id,
					date:data.date
				}

			Book.create(new_data,(err,book) => {
				if(err) throw err;

				res.json({success:true,data:book});
			});

		});
	}else{
		let new_data = {
			book_id:data.book_id,
			title:data.title,
			short_desc:data.short_desc,
			description:data.description,
			author:data.author,
			category:data.category,
			date:data.date
		}

		Book.create(new_data,function(err,book){
			if(err) throw err;
			res.json({success:true,data:book});
		});
	}
	
});


bookRouter.put('/update',(req:any,res:any)=>{
	let data = req.body;
	
	let category = req.body.category;
	if(category == "other"){
		Category.create({name:req.body.new_category},(err,new_category)=>{
			if(err) throw err;
				let new_data = {
					_id:data._id,
					book_id:data.book_id,
					title:data.title,
					short_desc:data.short_desc,
					description:data.description,
					author:data.author,
					category:new_category._id,
					date:data.date
				}

			Book.update(new_data,(err,book) => {
				if(err) throw err;

				res.json({success:true,data:book});
			});

		});
	}else{
		let new_data = {
			_id:data._id,
			book_id:data.book_id,
			title:data.title,
			short_desc:data.short_desc,
			description:data.description,
			author:data.author,
			category:data.category,
			date:data.date
		}

		Book.update(new_data,function(err,book){
			if(err) throw err;
			res.json({success:true,data:book});
		});
	}

});
//delete a book
bookRouter.post('/delete',(req:any,res:any)=>{
	let id = req.body.id;
	
	Book.remove({ _id: id },err =>{
		if (err) throw(err);
		res.json({
			success:true,
			data:id
		})
	});
});

export { bookRouter };