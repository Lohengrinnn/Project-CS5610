import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'Harry Potter I',
        type: 'book',
        price: 100,
        description: 'Harry Potter',
        address: '276 Sun Ridge Lane, San Jose, CA',
        owner: 'You know who',
        image: null,
        location: { lat: 45.4115777, lng: -73.31792759999999 },
      },
      {
        id: 2,
        name: 'Harry Potter II',
        type: 'book',
        price: 100,
        description: 'Harry Potter',
        address: '276 Sun Ridge Lane, San Jose, CA',
        owner: 'You know who',
        image: null,
        location: { lat: 45.4115777, lng: -73.01792759999999 },
      },
      {
        id: 3,
        name: 'Harry Potter III',
        type: 'book',
        price: 100,
        description: 'Harry Potter',
        address: '276 Sun Ridge Lane, San Jose, CA',
        owner: 'You know who',
        image: null,
        location: { lat: 37.310, lng: -121.907 },
      },
      {
        id: 4,
        name: 'Harry Potter IV',
        type: 'book',
        price: 100,
        description: 'Harry Potter',
        address: '276 Sun Ridge Lane, San Jose, CA',
        owner: 'You know who',
        image: null,
        location: { lat: 37.549, lng: -121.911 },
      },
    ];
  }
}
