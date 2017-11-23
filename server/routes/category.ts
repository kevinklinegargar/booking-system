
import { Request, Response, Router } from "express";
import { Category } from './../models/Categories';
// import { Parse } from './../config';


const categoryRouter: Router = Router();
//get all categories
categoryRouter.get("/all",(req: any,res:any)=>{
	
	Category.getAll(function(err,categories){
		if(err) throw err;
		res.json(categories);	
	});
});


export { categoryRouter };