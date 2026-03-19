import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    authStore = inject(AuthStore);

    constructor(private router: Router) { }

    canActivate(): boolean {

        //  const expiry = Number(localStorage.getItem('token_expiry'));

        if (this.authStore.token() == null || this.authStore.expiry() == null || Date.now() > this.authStore.expiry()!) {

            // here we can also check if the token is expired by comparing the current time with the expiry time

            this.authStore.logout();
            this.router.navigate(['/login']);
            return false;
        }
        // if (!expiry || Date.now() > expiry) {
        //     this.authStore.logout();
        //     this.router.navigate(['/login']);
        //     return false;
        // }

        return true;
    }
}