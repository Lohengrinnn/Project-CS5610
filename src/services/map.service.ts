import { Injectable, ElementRef } from '@angular/core';
import { GeoLocation } from '../classes/location';
import { Product } from '../classes/product';

const defaultLocation = {
  lat: 37.33,
  lng: -121.92,
};

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: any;

  constructor() {}

  initMap(mapElement) {
    return this.getUserLocation().then((location: GeoLocation) => {
      console.log('my location is', location);
      const mapProperties = {
        center: new google.maps.LatLng(location.lat, location.lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      this.map = new google.maps.Map(mapElement.nativeElement, mapProperties);
      return this.map;
    });
  }

  getUserLocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (location: any) => {
          resolve({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
        },
        () => {
          resolve(defaultLocation);
        }
      );

      // resolve(defaultLocation);
    });
  }

  markProducts(products: Product[]) {
    products.forEach(product => {
      this.markProduct(product);
    })
  }

  markProduct(product: Product, map:any = this.map) {
    const marker = new google.maps.Marker({
      map,
      position: product.location,
    });
    const infowindow = new google.maps.InfoWindow({content: `${product.name} $${product.price}`});

    marker.addListener("click",  () => {
      infowindow.open(map, marker);
    });

  }
}
