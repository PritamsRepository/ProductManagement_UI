import { Component, OnInit } from '@angular/core';
import{MatSidenavModule } from '@angular/material/sidenav';
import{MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  imports: [MatSidenavModule, MatListModule,MatIconModule, RouterModule],
  standalone: true
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  menuItems = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      name: 'Products',
      icon: 'inventory',
      route: '/products'
    },
    {
      name: 'Orders',
      icon: 'shopping_cart',
      route: '/orders'
    },
    {
      name: 'Reports',
      icon: 'bar_chart',
      route: '/reports'
    }
  ];

}
