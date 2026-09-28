import { Component, OnInit } from '@angular/core';
import { Operation } from '../operation';
import { FormsModule } from '@angular/forms';
import { OperationService } from '../operation-service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from '../user-service';
import { EncryptResponse } from '../encrypt-response';
import { EncryptRequest } from '../encrypt-request';

@Component({
  imports: [FormsModule],
  selector: 'app-save-operation',
  styleUrl: './save-operation.css',
  templateUrl: './save-operation.html',
})
export class SaveOperation implements OnInit{
  
  operation:Operation = new Operation();
  encryptRequest:EncryptRequest = new EncryptRequest();
  encryptResponse:EncryptResponse;


  constructor(
    private operationService:OperationService,
    private userService:UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.validSesion();
    this.operation.setEstatus('Aprobada');
  }

  private validSesion(){
    if(!this.userService.getToken()){
      this.router.navigate(["/login"]);
      return;
    }
  }

  private palabraEncrypt(){
    this.encryptRequest.palabra = this.operation.secreto;
    console.log(this.encryptRequest);

    this.operationService.setEncrypt(this.encryptRequest)
    .then(
      response => {
        console.log(response);
        this.operation.setSecreto(response.palabraEncrypted);
        this.saveOperation();
      }
    ).catch(
      error => {
        console.log(error);
        return error;
      }
    );
    // .pipe(
    //   tap(
    //     data => {
    //       console.log("response encrypt: ",data);
    //       this.operation.setSecreto(data.palabraEncrypted);
    //     }
    //   ),
    //   catchError(error => {
    //     console.log(error);
    //     alert("No se pudo encryptar la palabra");
    //     return throwError(() => new Error(error));
    //   })
    // ).subscribe();

  }

  private saveOperation(){

    console.log(this.operation);

    this.operationService.saveOperation(this.operation)
    .pipe(
      tap(data => {
        console.log(data);
        alert("Operación correcta");
        this.goToListOperations();
      }),
      catchError(error => {
        console.log(error);
        alert("No se pudo guardar la operacion");
        return throwError(() => new Error(error));
      })
    )
    .subscribe();
  }

  private goToListOperations() {
    this.router.navigate(["/operaciones"]);
  }

  onSubmit() {
    this.palabraEncrypt();
    // this.saveOperation();
  }
}