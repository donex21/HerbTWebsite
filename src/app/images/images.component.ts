import { Component, OnInit } from '@angular/core';
import { ImageService } from '../shared/image.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from "jquery";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  user: firebase.User;
    $: any;
  constructor(private service:ImageService, private router: Router,   private location: Location,  private auth: AuthService) { }

  ngOnInit() {
    this.service.GetHerbalList();
    // {
    // this.auth.getUserState()
    //   .subscribe( user => {
    //     this.user = user;
      // });
      $(function () {
        
      $('.navbar-toggler').on('click', function(event) {
      event.preventDefault();
      $(this).closest('.navbar-minimal').toggleClass('open');
    });
  })
  }


  goBack() {
    this.location.back();
  }

  logout(){
    this.router.navigate(['/home']);
  }

}
