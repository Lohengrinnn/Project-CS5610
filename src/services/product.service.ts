import { Injectable } from '@angular/core';

// const productUrl = 'http://localhost:8080/api/products';
const productUrl = "https://server-node-js-jiongwu.herokuapp.com/api/products"

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts = () =>
    fetch(productUrl, {
      credentials: 'include',
    }).then(response => response.json())


  findProductById = (productId) =>
    fetch(`https://great-flea-market.herokuapp.com/products/${productId}`)
      .then(response => response.json())

  updateProduct = (product) =>
    fetch(`https://great-flea-market.herokuapp.com/products/${product._id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: {
        'content-type': 'application/json'
      }
    })

  createProduct = (newProduct) => fetch(productUrl, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newProduct),
    headers: { 'content-type': 'application/json' }
  })

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
  })
}
