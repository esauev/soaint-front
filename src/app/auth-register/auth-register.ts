import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user-service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-auth-register',
  styleUrl: './auth-register.css',
  templateUrl: './auth-register.html',
})
export class AuthRegister {

  usuario: string;
  password: string;
  confirmPassword: string;

  constructor(private userService:UserService, private router:Router) {}

  register() {
    console.log(this.usuario);
    console.log(this.password);
    console.log(this.confirmPassword);

    if (this.password !== this.confirmPassword) {
      alert('Password no coincide');
      return;
    }

    const user = { usuario: this.usuario, password: this.password};

    console.log(user);

    this.userService.register(user)
    .pipe(
      tap(
        data => {
          console.log(data);
          // this.userService.setToken(data.password);
          this.router.navigate(["/login"]);
        }
      ),
      catchError(
        error => {
          console.log(error);
          // this.router.navigate(["/"]);
          return throwError(() => new Error(error));
        }
      )
    ).subscribe();
  }

  onSubmit(){
    this.register();
  }

}
