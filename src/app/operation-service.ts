import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Operation } from './operation';
import { EncryptRequest } from './encrypt-request';
import { EncryptResponse } from './encrypt-response';

@Service()
export class OperationService {

    private URL_OPERATION_LIST = "http://localhost:8081/operation/list-all";
    private URL_OPERATION_SAVE = "http://localhost:8080/operacion/venta";
    private URL_OPERATION_ENCRYPT = "http://localhost:8080/operacion/encrypt-secreto";
    private URL_OPERATION_UPDATE = "http://localhost:8081/operation/save";
    private http = inject(HttpClient);

    getListOperations():Observable<Operation[]> {
        return this.http.get<Operation[]>(`${this.URL_OPERATION_LIST}`);
    }

    saveOperation(operation:Operation) : Observable<Object> {
        return this.http.post(`${this.URL_OPERATION_SAVE}`, operation);
    }
    
    setEncrypt(encryptRequest:EncryptRequest) : Promise<EncryptResponse> {
        return lastValueFrom(this.http.post<EncryptResponse>(this.URL_OPERATION_ENCRYPT, encryptRequest));
    }

    updateOperation(operation:Operation) : Observable<Object> {
        return this.http.post(`${this.URL_OPERATION_UPDATE}`, operation);
    }
}
