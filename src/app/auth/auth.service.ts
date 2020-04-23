import { Injectable,NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { error } from 'protractor';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private eventAuthError = new BehaviorSubject<String>("");
eventAuthError$ = this.eventAuthError.asObservable();
newUser: any;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning 
    ) { }

    getUserState() {
      return this.afAuth.authState;
    }

    //user logged in if already have an account
    login( email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          this.eventAuthError.next(error);
        })
        .then(userCredential => {
          if(userCredential) {
            this.router.navigate(['/dashboard']);
          }
        })
    }

    createUser(user){
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredential =>{
        this.newUser = user
        console.log(userCredential)
        userCredential.user.updateProfile({
          displayName: user.firstName + ' '+ user.lastName

        });

this.insertUserData(userCredential)
.then(()=>{
  this.router.navigate(['/dashboard']);

});
        
      })
      .catch(error => {
this.eventAuthError.next(error);

      })

    }

    insertUserData(userCredential: firebase.auth.UserCredential){
      return this.db.doc(`Users/${userCredential.user.uid}`).set({

        email: this.newUser.email,
        firstName: this.newUser.firstName,
        middleName: this.newUser.middleName,
        lastName: this.newUser.lastName,
        dateOfBirth: this.newUser.dateOfBirth,
        addRess: this.newUser.addRess,
        // gender: this.newUser.gender,
        password: this.newUser.password,
        role: 'Admin',
        status: 'Active'
      })

    }
    GoogleAuth() {
      console.log('Redirecting to Google login provider');
      return this.AuthLogin(new auth.GoogleAuthProvider());
    }  
    AuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log("Successfully logged in!")
         this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          })
    }).catch((error) => {
        console.log(error)
    })
  }

    logout()
    {
      return this.afAuth.auth.signOut();
      
    }
}
