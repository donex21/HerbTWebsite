import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from 'src/app/shared/image.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  formTemplate:FormGroup;

 

  constructor(
    private storage: AngularFireStorage,
    private service: ImageService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService ) { }

  ngOnInit() {
    this.formTemplate = this.formBuilder.group({
      Bisname:  ['', [Validators.required]],
      Sciename: ['', [Validators.required]],
      Engname:  ['', [Validators.required]],
      Family: ['', [Validators.required]],
      Location: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      Treatments:  ['', [Validators.required]],
      Procedure: ['', [Validators.required]],
      HerbCount : ['1',[]],
      HerbPercent: ['',[]],
      UserID:['',[]]
    });
  }

// Accessing form control using getters
get Bisname() {
  return this.formTemplate.get('Bisname');
}

get Sciename() {
  return this.formTemplate.get('Sciename');
}  

get Engname() {
  return this.formTemplate.get('Engname');
}

get Family() {
  return this.formTemplate.get('Family');
}
get Location() {
  return this.formTemplate.get('Location');
}

get Status() {
  return this.formTemplate.get('Status');
}  

get Type() {
  return this.formTemplate.get('Type');
}

get imageUrl() {
  return this.formTemplate.get('imageUrl');
}
get Treatments() {
  return this.formTemplate.get('Treatments');
}

get Procedure() {
  return this.formTemplate.get('Procedure');
}

get HerbCount(){
  return this.formTemplate.get('HerbCount');
}
get HerbPercent(){
  return this.formTemplate.get('HerbPercent');
}
get UserID(){
  return this.formTemplate.get('UserID');
}
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.Type}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.service.AddHerbal(formValue);
            this.toastr.success('successfully added!');
            this.ResetForm();    
          })
        })
      ).subscribe();
    }
  }

  ResetForm() {
    this.formTemplate.reset();
    
  }  

 



  // get formControls() {
  //   return this.formTemplate['controls'];
  // }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imagesUrl: '',
      Bisname:'',
      Sciename:'',
      Engname: '',
      Family: '',
      Location: '',
      Status:'',   
      Type: '',
      Treatments: '',
      Procedure:''
   });
    this.imgSrc = 'src/assets/img/image_placeholder.jpg'
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  
  logout(){
    this.router.navigate(['/home']);
  }

}