import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';
import { Herbal } from 'src/app/shared/herbal';


@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  bisname:any; 
  p: number = 1;   
   Herbal = [];  
  hideWhenNoHerbal: boolean = false; 
  noData: boolean = false;
  preLoader: boolean = true;   

public searchString: string;
  constructor(private service: ImageService) 
  {}
  ngOnInit() {
    this.dataState();
    let s = this.service.GetHerbalList();
      s.snapshotChanges().subscribe(
        item => {
          this.Herbal=[];
          item.forEach(element  =>{
            let a = element .payload.toJSON();
            a['$key'] = element .key;
            this.Herbal.push (a as Herbal);
          })
        })
      }
      update(herbal: Herbal) {
        this.service.UpdateHerbal(herbal);
      }

Search(){
  if(this.bisname != "" ){
    this.Herbal = this.Herbal.filter(res =>{
      return res.Bisname.toLocaleLowerCase().match(this.bisname.toLocaleLowerCase());    
    })
  }
  else if (this.bisname == "")
  {
    console.log ('Not found')
    this.ngOnInit();

  } 
}
dataState()
{ this.service.GetHerbalList().valueChanges().subscribe(data=>{
  this.preLoader = false;
  if(data.length <= 0){
    this.hideWhenNoHerbal = false;
    this.noData = true;
  }
  else {
    this.hideWhenNoHerbal = true;
    this.noData = false;
  }
})
}
}