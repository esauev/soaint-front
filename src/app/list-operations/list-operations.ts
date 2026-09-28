import { Component, OnInit } from '@angular/core';
import { Operation } from '../operation';
import { OperationService } from '../operation-service';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from '../user-service';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  imports: [RouterLinkWithHref, RouterLinkActive],
  selector: 'app-list-operations',
  styleUrl: './list-operations.css',
  templateUrl: './list-operations.html',
})
export class ListOperations implements OnInit {

  operations:Operation[];

  constructor(
    private operationService:OperationService, 
    private userService:UserService,
    private router:Router
  ){}

  ngOnInit(): void {
    // this.operations = [];
    this.validSesion();
    this.getOperations();
  }

  private validSesion(){
    if(!this.userService.getToken()){
      this.router.navigate(["/login"]);
      return;
    }
  }

  private getOperations() {
    // this.operationService.getListOperations().subscribe(data => {
    //   this.operations = data
    // });
    if(!this.operations) {
      this.operationService.getListOperations()
      .pipe(
        tap(data => {
                // console.log(data);
                this.operations = data;
        }),
        catchError(error => {
          console.log(error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe();
    }
  }

  private closeSession() {
    this.userService.deleteToken();
    this.router.navigate(["/login"]);
  }

  cancelOperation(operation:Operation) {
    operation.estatus = "Cancelada";
    console.log(operation);
    this.operationService.updateOperation(operation)
    .pipe(
      tap(data => {
        console.log(data);
        alert("Operación Cancelada");
      }),
      catchError(error => {
        console.log(error);
        alert("No se pudo cancelar la operacion");
        return throwError(() => new Error(error));
      })
    )
    .subscribe();
  }

}
