import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routes } from './app.router';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookCreateComponent } from './book/book-create.component';
import { BookUpdateComponent } from './book/book-update.component';
import { LoginComponent } from './auth/login.component';
import { NavHeaderComponent } from './shared/nav.component';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { BookService } from './services/book.service';
import { CategoryService } from './services/category.service';
import { AuthGuard } from './services/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookCreateComponent,
    BookUpdateComponent,
    LoginComponent,
    NavHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      {
        useHash: false
      }
    )
  ],
  providers:[
    AuthGuard,
    BookService,
    CategoryService,
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
