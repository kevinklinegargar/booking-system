import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BookService } from './../services/book.service' ;
import { Book } from './../interfaces/book.interface';



@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	books:Observable<Book[]>;

	constructor(
		public fb: FormBuilder,
		private bookService:BookService,
		private router:Router
	
	) {


	}
	ngOnInit(){
		this.books = this.bookService.books;
		this.bookService.loadBooks();
		this.bookService.zero_book.subscribe(val=>{

			if(val == true){
				this.router.navigate(['/book/create']);
			}
		})

	
	}
	deleteBook(id){
		if(confirm("Are you sure to remove this book?")){
			this.bookService.deleteBook(id).subscribe(res =>{
				
			
			});
		}
	
	}


 
}
