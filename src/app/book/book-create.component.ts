import { Component, OnInit,NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BookService } from './../services/book.service' ;
import { Book } from './../interfaces/book.interface';
import { ActivatedRoute,Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { CategoryService } from './../services/category.service' ;
 import { Category } from './../interfaces/category.interface';
@Component({
	selector: 'book-create',
	templateUrl: './book-create.component.html',
	styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
    createBookForm: FormGroup;
    showAddCategory:boolean= false;
     categories:Category[];
	constructor(
        private http:Http,
		public fb: FormBuilder,
        private bookService:BookService,
        private categoryService:CategoryService,
        private router: Router,
        private zone:NgZone) {

		this.createBookForm = fb.group({
          title: ['', Validators.required],
          book_id:['',Validators.required],
          short_desc: ['', Validators.required],
          description: ['', Validators.required],
          author: ['', Validators.required],
          category: ['', Validators.required],
          date: ['', Validators.required],
          new_category: ['',]
          
		});

	}
	ngOnInit(){
        this.getCategories();
        
      
        

    }

    getCategories() {
        this.categoryService.loadCategories().subscribe(
            categories =>{
                this.categories = categories;
       
            } ,
        err=> console.log(err));
     }
    
    create({ value, valid }: { value: any, valid: boolean }){
 
     
        let data = {
            title:value.title,
            book_id:value.book_id,
            short_desc:value.short_desc,
            description:value.description,
            author:value.author,
            category:value.category,
            date:value.date,
            new_category:value.new_category
        }
        this.bookService.createBook(data).subscribe(result=>{
            
            if(result.success === true){
                alert("Successfully created");
                this.router.navigate(['/']);
            }else{
                alert("Failed to update the book");
                return false;
            }
            
        });

    }
    //Show new category field if the category value is other
    toggleAddCategory(event){
        let newCategoryControl = this.createBookForm.get('new_category');
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
