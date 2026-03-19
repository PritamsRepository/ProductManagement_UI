import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from './core/auth/auth.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ProductInventory_UI');

  authStore = inject(AuthStore);
  constructor() {
    // 🔁 Multi-tab logout sync
    window.addEventListener('storage', (event) => {
      if (event.key === 'logout') {
        this.authStore.logout(false);
      }
    });

  }

  ngOnInit() {
    this.authStore.startTokenTimer();
  }
}
