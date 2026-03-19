import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { jwtDecode } from 'jwt-decode';
import { IJwtPayload } from '../models/interfaces/IJwtPayload';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
let logoutTimer: any;
// const router = inject(Router);
export const AuthStore = signalStore(
    { providedIn: 'root' },

    // Props
    withProps(() => ({
        router: inject(Router)
    })),
    // ✅ STATE
    withState({
        user: null as IJwtPayload | null,
        token: localStorage.getItem('token'),
        expiry: Number(localStorage.getItem('token_expiry'))
    }),



    // ✅ METHODS
    withMethods((store) => ({

        // 🔐 LOGIN
        login(token: string) {
            try {


                //   const token = response.token;

                // const payload = JSON.parse(atob(token.split('.')[1]));
                // const expiry = payload.exp * 1000;


                const payload = jwtDecode<IJwtPayload>(token);
                if (!payload.exp) {
                    console.error('Invalid token: no exp');
                    this.logout();
                    return;
                }
                const expiry = payload.exp * 1000;

                // Save in storage
                localStorage.setItem('token', token);
                localStorage.setItem('token_expiry', expiry.toString());

                // Update signals

                //   store.token.set(token);
                //   store.user.set(payload);
                //   store.expiry.set(expiry);


                patchState(store, {
                    token,
                    user: payload,
                    expiry
                });


                this.startTokenTimer();
            }
            catch (error) {
                console.error('Invalid token:', error);
                this.logout();
            }
        },

        // 🚪 LOGOUT
        logout(triggerEvent = true) {
            if (logoutTimer) {
                clearTimeout(logoutTimer);
                logoutTimer = null;
            }
            localStorage.removeItem('token');
            localStorage.removeItem('token_expiry');

            if (triggerEvent) {
                localStorage.setItem('logout', Date.now().toString());
            }

            //   store.token.set(null);
            //   store.user.set(null);
            //   store.expiry.set(0);

            // ✅ CORRECT WAY
            patchState(store, {
                token: null,
                user: null,
                expiry: 0
            });
            // if (triggerEvent) {
                store.router.navigate(['/login']);
            // }
            // router.navigate(['/login']);


        },

        // ✅ CHECK LOGIN
        isLoggedIn() {
            return !!store.token() && Date.now() < store.expiry();
        },

        // ⏳ AUTO LOGOUT TIMER
        startTokenTimer() {
            const expiry = store.expiry();
            console.log('🟢 Expiry:', expiry);
            console.log('🟢 Current Time:', Date.now());
            if (!expiry) return;

            const timeout = expiry - Date.now();
            console.log('🟡 Timeout (ms):', timeout);
            console.log('🟡 Timeout (sec):', timeout / 1000);

            if (timeout <= 0) {
                console.log('♻️ Clearing previous timer');
                this.logout();
                return;
            }

            if (logoutTimer) {
                console.log('♻️ Clearing previous timer');
                clearTimeout(logoutTimer);
            }

            logoutTimer = setTimeout(() => {
                console.log('🔥 AUTO LOGOUT TRIGGERED');
                this.logout();
            }, timeout);
        }

    }))
);