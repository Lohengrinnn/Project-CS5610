import { Injectable } from '@angular/core';

// const productUrl = 'http://localhost:8080/api/products';
// const productUrl = 'https://great-flea-market.herokuapp.com/products';
const productUrl = "https://server-node-js-jiongwu.herokuapp.com/api/products"

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts = () =>
    fetch(productUrl).then(response => response.json())

  createProduct = (newProduct) => fetch(productUrl, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newProduct),
    headers: { 'content-type': 'application/json' }
  })
}
