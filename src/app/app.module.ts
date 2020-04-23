import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { HttpClientModule } from '@angular/common/http';
 import { ToastrModule } from 'ngx-toastr';
// NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';
import {ModalModule} from 'ngx-bootstrap/modal';
import { LightboxModule } from 'ngx-lightbox';
//firebase
import { AngularFireModule } from 'angularfire2/';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule, StorageBucket } from 'angularfire2/storage';

//user interface
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { SigninComponent } from './auth//signin/signin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ImagesComponent } from './images/images.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageComponent } from './images/image/image.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageEditComponent } from './image-edit/image-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SigninComponent,
    HomepageComponent,
    ImagesComponent,
    ImageListComponent,
    ImageComponent,
    DashboardComponent,
    ImageEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,   
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
   AngularFireAuthModule,
   AngularFireStorageModule,
   AngularFirestoreModule,
   HttpClientModule,
   LightboxModule,
   ToastrModule.forRoot({      // Register NgxToast NPM module
    timeOut: 3000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,  
  }),
  NgxPaginationModule , // NGX pagination module
  ModalModule.forRoot()
   
  ],
  providers: [ { provide: StorageBucket, useValue: 'onlineshop-af1dc.appspot.com' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
