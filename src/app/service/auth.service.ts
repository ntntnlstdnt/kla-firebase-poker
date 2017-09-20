import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {User, auth} from 'firebase/app';

@Injectable()
export class AuthService {

  private authState: User = null;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.authState.subscribe((authState) => {
      this.authState = authState;

      if (!authState) {
        this.router.navigate(['/login']);
      }
    });
  }

  loginWithGoogle() {
    const provider = (new auth.GoogleAuthProvider()).setCustomParameters({prompt: 'select_account'});

    this.angularFireAuth
      .auth
      .signInWithPopup(provider)
      .then(u => {
        console.log('logged in!');
        this.router.navigate(['/home']);
      })
      .catch(e => {
        console.log('Ground control to major tom, your circuits dead there is something wrong', e.message);
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authState != null;
  }

  getAuthStateObservable() {
    return this.angularFireAuth.authState;
  }
}
