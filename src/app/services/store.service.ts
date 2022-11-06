import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'

const URL = 'https://fakestoreapi.com'
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http:HttpClient) { }
  getAllProducts(limit ='12',sort="desc", category?:string): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(
      `${URL}/products${category ? '/category/' + category:''}?sort=${sort}&limit=${limit}`
    )
  }
  getAllCategories(): Observable<Array<string>>{
    return this.http.get<Array<string>>(
      `${URL}/products/categories`
    )
  }
}
