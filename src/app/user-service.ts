import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Service()
export class UserService {

    private URL_LOGIN = "http://localhost:8081/usuario/login";

    private URL_REGISTER = "http://localhost:8081/usuario/register";

    private http = inject(HttpClient);

    private cookie = inject(CookieService);


    login(user:any): Observable<any> {
        return this.http.post(this.URL_LOGIN, user);
    }

    register(user: any): Observable<any> {
        return this.http.post(this.URL_REGISTER, user);
    }

    setToken(token:string) {
        this.cookie.set("token", token);
    }

    getToken() {
        return this.cookie.get("token");
    }

    deleteToken() {
        this.cookie.delete("token");
    }

}
