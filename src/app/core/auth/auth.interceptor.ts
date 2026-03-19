import { Injectable, inject } from '@angular/core';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    authStore = inject(AuthStore);
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authStore.token();
console.log('AuthInterceptor - token:', token);
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }
}