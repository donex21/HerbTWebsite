import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ImageService } from 'src/app/shared/image.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';
  
  
  @Component({
    selector: 'app-image',
    templateUrl: './image-edit.component.html',
    styleUrls: ['./image-edit.component.css']
  })
  export class ImageEditComponent implements OnInit {
    editForm: FormGroup;  // Define FormGroup to student's edit form
    imgSrc: string;
    constructor(
      private service: ImageService,       // Inject CRUD API in constructor
      private formBuilder: FormBuilder,            // Inject Form Builder service for Reactive forms
      private location: Location,         // Location service to go back to previous component
      private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
      private router: Router,             // Router service to navigate to specific component
      private toastr: ToastrService       // Toastr service for alert message
    ){ }
    ngOnInit() {
      
      this.updateHerbalData(); // Call updateHerbalData() as soon as the component is ready 
      const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
      this.service.GetHerbal(id).valueChanges().subscribe(data => {
        this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    
      })
    }

// Accessing form control using getters
// get Location() {
//   return this.editForm.get('Location');
// }

// get Status() {
//   return this.editForm.get('Status');
// }  

// get Treatments() {
//   return this.editForm.get('Treatments');
// }

// get Procedure() {
//   return this.editForm.get('Procedure');
// }

// Accessing form control using getters
get Bisname() {
  return this.editForm.get('Bisname');
}

get Sciename() {
  return this.editForm.get('Sciename');
}  

get Engname() {
  return this.editForm.get('Engname');
}

get Family() {
  return this.editForm.get('Family');
}
get Location() {
  return this.editForm.get('Location');
}

get Status() {
  return this.editForm.get('Status');
}  

get Type() {
  return this.editForm.get('Type');
}

get imageUrl() {
  return this.editForm.get('imageUrl');
}
get Treatments() {
  return this.editForm.get('Treatments');
}

get Procedure() {
  return this.editForm.get('Procedure');
}

get HerbCount(){
  return this.editForm.get('HerbCount');
}

    updateHerbalData() {
      this.editForm = this.formBuilder.group({
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
        HerbCount: ['', []],
        HerbPercent: ['', []],
        UserID: ['', []]

      })
      
}
 // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.service.UpdateHerbal(this.editForm.value);       // Update student data using CRUD API
    this.toastr.success(this.editForm.controls['Bisname'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['herbal/list']);               // Navigate to student's list page when student data is updated
  }

}
