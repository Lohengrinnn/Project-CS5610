import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

//const productUrl = 'http://localhost:8080/api/products';
const productUrl = "https://server-node-js-jiongwu.herokuapp.com/api/products"

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts = () =>
    fetch(productUrl, {
      credentials: 'include',
    }).then(response => response.json())


  findProductById = (productId) =>
    fetch(`${productUrl}/${productId}`)
      .then(response => response.json())

  // createProduct = (newProduct) => fetch(productUrl, {
  //   method: 'POST',
  //   credentials: 'include',
  //   body: JSON.stringify(newProduct),
  //   headers: { 'content-type': 'application/json' }
  // })

  searchProduct = (searchConditions) => fetch(productUrl+'/search', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(searchConditions),
    headers: { 'content-type': 'application/json' }
  }).then(response => response.json())

  updateProduct = (product) => fetch(`${productUrl}/${product._id}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(product),
    headers: { 'content-type': 'application/json' }
  })

  deleteProduct = (productId) => fetch(`${productUrl}/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then(response => response.json())

  // Create User
  createProduct(newProduct: any, image) {
    let formData: any = new FormData();
    for (let key in newProduct){
      let val = newProduct[key];
      if (key === "location") {
        formData.append(key, JSON.stringify(val));
      } else {
        formData.append(key, val);
      }
    }
    formData.append("image", image);
    let headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      'Accept' : 'application/json'
    });
    let options = { 'headers': headers }
    return this.http.post<any>(productUrl, formData, options)
  }
}
