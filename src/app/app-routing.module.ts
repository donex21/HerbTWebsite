import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  { path: 'login' , component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomepageComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/home', pathMatch:'full'},
  {
    path: 'herbal', component: ImagesComponent, children: [
      { path: 'upload', component: ImageComponent },
      { path: 'list', component: ImageListComponent },  
    ]
  },
  { path:  'edit/:id', component: ImageEditComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
