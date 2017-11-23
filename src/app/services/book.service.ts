import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

import { Book } from './../interfaces/book.interface';
@Injectable()
export class BookService {
	books: Observable<Book[]>;
	zero_book: BehaviorSubject<Boolean>;
	private _books: BehaviorSubject<Book[]>;
	private bookStore: {
		books: Book[]
	  };
	constructor(private http: Http) { 
		this.bookStore = { books: [] };
		this._books= <BehaviorSubject<Book[]>>new BehaviorSubject([]);
		this.books = this._books.asObservable();
		this.zero_book=new BehaviorSubject(false);


	}

	  
	loadBooks(){
	
		this.http.get('api/book/all')
			.subscribe((response: Response) => {
				
				let data = response.json();
				
				if(data.length == 0){
					this.zero_book.next(true);	
				}
				this.bookStore.books = data;
				this._books.next(Object.assign({}, this.bookStore).books);
			},
			err =>{
				console.log("error");
				console.log(err);
			}
		);

	}

	loadBook(id){
	

		return this.http.get('api/book/id?x='+id)
		.map((response: Response) => <Book> response.json());

	}
	newBook(data){
		this._books.next([data,...this.bookStore.books]);
	}
	deleteBook(id){
		return this.http.post('api/book/delete',{id:id})
		.map((response: Response) =>{
			this.bookStore.books.forEach((book,i)=>{
		
				if(book._id == id){
					this.bookStore.books.splice(i, 1); 
				}
		
			});
			this._books.next(Object.assign({}, this.bookStore).books);
			response.json();
		});	
	}

	updateBook(data){
		return this.http.put('/api/book/update',data).map((response:Response)=>response.json());
	}

	createBook(data){
		return this.http.post('/api/book/create',data).map((response:Response)=>response.json());
	}

 
}