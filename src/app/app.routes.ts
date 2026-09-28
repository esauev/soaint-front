import { Routes } from '@angular/router';
import { ListOperations } from './list-operations/list-operations';
import { SaveOperation } from './save-operation/save-operation';
import { AuthLogin } from './auth-login/auth-login';
import { AuthRegister } from './auth-register/auth-register';

export const routes: Routes = [
    { path: "login", component: AuthLogin, pathMatch: "full"},
    { path: "register", component: AuthRegister, pathMatch: "full"},
    { path: 'guardar-operacion', component: SaveOperation, pathMatch: "full"},
    { path: 'operaciones', component: ListOperations, pathMatch: "full"},
    { path: '', redirectTo: 'operaciones', pathMatch: 'full'} 
];
