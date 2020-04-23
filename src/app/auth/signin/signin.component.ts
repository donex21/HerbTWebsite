import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  authError: any;
  formTemplate: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
    
  }
  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      email: '',
      password: ''
});

  }
  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }
  loginviaGoogle() {
    console.log('Login...');
    this.auth.GoogleAuth(); 
    
  }
  
}
  
