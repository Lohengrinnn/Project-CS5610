import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  productUrl = "http://great-flea-market.herokuapp.com/products"
  //productUrl = "http://localhost:8080/products"

  constructor() {}

  getProducts = () =>
    fetch(this.productUrl).then(response => response.json())

}
