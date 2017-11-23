import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BookService } from './../services/book.service' ;
import { Book } from './../interfaces/book.interface';
import { ActivatedRoute,Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { CategoryService } from './../services/category.service' ;
 import { Category } from './../interfaces/category.interface';
 import { DatePipe } from '@angular/common';
@Component({
	selector: 'book-update',
	templateUrl: './book-update.component.html',
	styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {
    updateBookForm: FormGroup;
    showAddCategory:boolean= false;
    categories:Category[];
    book:Book ={
        book_id:"",
        title:"",
        author:"",
        short_desc:"",
        description:"",
        category:"",
        date:""

    } ;
    bookId:string;
    title:string;
    short_desc:string;

    private sub: any;
	constructor(
        private http:Http,
		public fb: FormBuilder,
        private bookService:BookService,
        private categoryService:CategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private datePipe:DatePipe) {

		this.updateBookForm = fb.group({
            book_id: [this.book.book_id, Validators.required],
		    title: [this.book.title, Validators.required],
            short_desc: [this.book.short_desc, Validators.required],
            description: [this.book.description, Validators.required],
            author: [this.book.author, Validators.required],
            date: [this.book.date, Validators.required],
            category: [this.book.category, Validators.required],
            new_category: ['',]
          
		});

	}
	ngOnInit(){

        //fetch all categories to be render in the template
        this.getCategories();
        //get the book id in the url then fetch the values
        this.sub = this.route.params.subscribe(params => {
           
            this.bookId = params.id;
            this.getBookValues(this.bookId);
            
         });
        
    }
    getBookValues(id){

        this.bookService.loadBook(id).subscribe(
            book =>{
                this.book = book;
                this.updateBookForm.controls.book_id.setValue(book.book_id);
                this.updateBookForm.controls.title.setValue(book.title);
                this.updateBookForm.controls.short_desc.setValue(book.short_desc);
                this.updateBookForm.controls.description.setValue(book.description);
                this.updateBookForm.controls.author.setValue(book.author);
                this.updateBookForm.controls.category.setValue(book.category);
                this.updateBookForm.controls.date.setValue(this.datePipe.transform(book.date, 'yyyy-MM-dd'));
            } ,
        err=> console.log(err));
    }
    getCategories() {
        this.categoryService.loadCategories().subscribe(
            categories =>{
                this.categories = categories;
            } ,
        err=> console.log(err));
     }
    
    update({ value, valid }: { value: any, valid: boolean }){
 
     
        let data = {
            _id:this.book._id,
            book_id:value.book_id,
            title:value.title,
            short_desc:value.short_desc,
            description:value.description,
            author:value.author,
            date:value.date,
            category:value.category,
            new_category:value.new_category
        }
        this.bookService.updateBook(data).subscribe(result=>{

            if(result.success === true){
                alert("Successfully update the book details");
                this.router.navigate(['/']);

            }else{
                alert("Failed to update the book");
                return false;
            }
            
        });
        

    }

    //Show new category field if the category value is other
    toggleAddCategory(event){
        let newCategoryControl = this.updateBookForm.get('new_category');
        let value = event.target.value;

        if(value == "other"){
            this.showAddCategory = true;
            newCategoryControl.setValidators([Validators.required]);
            newCategoryControl.updateValueAndValidity(); 
        }else{
            this.showAddCategory = false;
            newCategoryControl.setValidators([]);
            newCategoryControl.updateValueAndValidity(); 
        }
    }


 
}
