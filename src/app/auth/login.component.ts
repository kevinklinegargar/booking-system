import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Http, Response } from '@angular/http';


@Component({
	selector: "login",
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    loginForm: FormGroup;
	constructor(
		public fb: FormBuilder,
		private router: Router ,
		private http:Http) {
		
	}
	ngOnInit(){
        this.loginForm = this.fb.group({
			password: ["", Validators.required]
			
		});
	}

    login({ value, valid }: { value: any, valid: boolean }) {
		if(valid == true){


			var password = value.password;

			this.http.post('/api/auth/login',{password:password}).toPromise()
			.then((res)=>{
		
                let result = res.json();

                if(result.success == true){
					//If login is successful redirect to the dashboard
                    this.router.navigate(['/']);
                }else{
                    alert("Invalid authentication");
                }
					
				
			}).catch((error:any)=>{
				console.error('An error occurred', error);
			    return Promise.reject(error.message || error);	
			});

		}
	

	}

  
}