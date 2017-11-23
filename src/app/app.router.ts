import { Routes,RouterModule,CanActivate  } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookCreateComponent } from './book/book-create.component';
import { BookUpdateComponent } from './book/book-update.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './services/auth-guard';


export const routes: Routes = [
    { path: '', component: DashboardComponent,canActivate: [AuthGuard]},
    { path:'book/create',component:BookCreateComponent,canActivate: [AuthGuard]},
    { path:'book/update/:id',component:BookUpdateComponent,canActivate: [AuthGuard]},
    { path:'login',component:LoginComponent}

];
