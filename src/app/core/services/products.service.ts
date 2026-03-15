import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClient.service';
import { Observable } from 'rxjs';
import { IProducts } from '../models/interfaces/iproducts';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpService: HttpClientService) { }


  getProducts(): Observable<IProducts[]> {
    return this.httpService.get<IProducts[]>('Products/GetProductsList');
  }
}
