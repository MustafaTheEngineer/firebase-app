import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signUp() {
    this.authService
      .signUp(this.email, this.password)
      .then(() => {
        console.log('Successfully signed up!');
        // Add your desired logic here after successful sign-up
      })
      .catch((error) => console.log(error));
  }

  signIn() {
    this.authService
      .signIn(this.email, this.password)
      .then(() => {
        console.log('Successfully signed in!');
        // Add your desired logic here after successful sign-in
        this.router.navigate(['/home']);
      })
      .catch((error) => console.log(error));
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => {
        console.log('Successfully signed out!');
        // Add your desired logic here after successful sign-out
      })
      .catch((error) => console.log(error));
  }
}
