import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
	selector: "nav-header",
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavHeaderComponent{
  
	constructor(private http:Http,private router:Router) {

	}
	logout(){
		this.http.post('/api/auth/logout',{}).toPromise()
		.then((res)=>{
	
			let result = res.json();
			if(result.success == true){
				this.router.navigate(['/login']);
			}
			
		}).catch((error:any)=>{
			console.error('An error occurred', error);
			return Promise.reject(error.message || error);	
		});

	}
  
}