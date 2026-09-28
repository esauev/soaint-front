import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user-service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-auth-login',
  styleUrl: './auth-login.css',
  templateUrl: './auth-login.html',
})
export class AuthLogin implements OnInit {

  usuario:string;
  password:string;

  constructor(private userSevice:UserService, private router:Router) {}

  ngOnInit(): void {
    this.clearToken();
  }

  private login() {
    // console.log(this.usuario);
    // console.log(this.password);
    
    const user = { usuario: this.usuario, password: this.password};

    // console.log("user: ", user);

    this.userSevice.login(user)
    .pipe(
      tap(
        data => {
          if (data) {
            // console.log("data: ",data);
            this.userSevice.setToken(data.password);
            this.router.navigate(["/operaciones"]); 
          }
        }
      ),
      catchError(
        error => {
          // console.log("error: ", error);
          // console.log("error: ", error.status);
          if(error.status){
            alert("Usuario o Password incorrecto! \n")
          }
          return throwError(() => new Error(error));
        }
      )
    )
    .subscribe();

  }

  private onSubmit() {
    this.login();
  }

  private registerUser(){
    this.router.navigate(["/register"]);
  }

  private clearToken(){
    this.userSevice.deleteToken();
  }
}
