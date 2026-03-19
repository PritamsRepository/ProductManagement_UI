import { AfterViewInit, Component, OnInit, inject, ViewChild, WritableSignal } from '@angular/core';
import { IProducts } from 'src/app/core/models/interfaces/iproducts';
import { ProductsService } from 'src/app/core/services/products.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginator, MatSort, FormsModule, MatFormFieldModule, MatInputModule],
  standalone: true

})
export class ProductsComponent implements OnInit, AfterViewInit {

  private productService = inject(ProductsService);
  products = new MatTableDataSource<IProducts>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] =
    ['productId', 'productName', 'manufacturerName', 'vendorName',
      'receivedDate', 'manufacturingDate', 'expiryDate', 'vendorPrice',
      'actualPrice', 'ingredients', 'description'];


  constructor() { }

  ngOnInit() {
    this.getProducts();
  }
  ngAfterViewInit() {
    this.products.paginator = this.paginator;
    this.products.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }


  getProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products.data = response;
      },
      error: (error) => {
        console.error('Failed to fetch products:', error);
      }
    });
  }
  addProduct() {
    console.log("Add product clicked");
  }

  editProduct(product: IProducts) {
    console.log("Edit", product);
  }

  deleteProduct(id: number) {
    console.log("Delete", id);
  }



}
