import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { Herbal } from './herbal';
@Injectable({
  providedIn: 'root'
})
export class ImageService {


  herballist: AngularFireList<any>;
  herbalobj: AngularFireObject<any>
  constructor(private fb: AngularFireDatabase) { }
  
  AddHerbal(herbal: Herbal) {
    this.herballist.push({
      Bisname: herbal.Bisname,
      Sciename: herbal.Sciename,
      Engname: herbal.Engname,
      Family: herbal.Family,
      Location: herbal.Location,
      Status: herbal.Status,
      Type: herbal.Type,
      imageUrl: herbal.imageUrl,
      Treatments:  herbal.Treatments,
      Procedure: herbal.Procedure,
      HerbCount : herbal.HerbCount,
      HerbPercent: herbal.HerbPercent,
      UserID: herbal.UserID
    })
  }
  GetHerbal(id: string){
    this.herbalobj = this.fb.object('Herbal/' + id);
    return this.herbalobj;
  }
    GetHerbalList() {
      this.herballist = this.fb.list('Herbal');
      return this.herballist;
    }
 
    UpdateHerbal(herbal: Herbal) {
      this.herbalobj.update({        
        Bisname: herbal.Bisname,
        Sciename: herbal.Sciename,
        Engname: herbal.Engname,
        Family: herbal.Family,
        Location: herbal.Location,
        Status: herbal.Status,
        Type: herbal.Type,
        Treatments:  herbal.Treatments,
        Procedure: herbal.Procedure,
        HerbCount : herbal.HerbCount,
        HerbPercent: herbal.HerbPercent,
        UserID: herbal.UserID
      })
    }
  
}
