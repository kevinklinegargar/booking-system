import {Router, ActivatedRoute,CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import { Http, Response } from '@angular/http';

@Injectable()
class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http:Http) {}
 
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        //Check if the user is currently login. If false redirect to the homepage
       return this.http.get('/api/auth/check').map((res: Response)=>{
            let result = res.json();
        
            if(result.success == true){
                return true;
            }else{
                this.router.navigate(['/login']);
                return false; 
            }
         });

    }
}   
export { AuthGuard };