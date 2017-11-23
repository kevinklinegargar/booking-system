import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';

import { Category } from './../interfaces//category.interface';
@Injectable()
export class CategoryService {

	constructor(private http: Http) { 

	}

	loadCategories(){

		return this.http.get('api/category/all')
			.map((response: Response) => <Category[]> response.json());

	}

 
}