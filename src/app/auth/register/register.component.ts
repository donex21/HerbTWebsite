import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

authError: any;
responseMessage: string = '';
  responseMessageType: string = '';
  showMessage: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;

    })
  }
  createUser(frm){
this.auth.createUser(frm.value);
  }
  loginviaGoogle() {
    console.log('Login...');
    this.auth.GoogleAuth();  
  }
}
