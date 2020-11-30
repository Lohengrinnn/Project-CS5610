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

  getGoogleMap() {
    return new Promise((resolve, reject) => {
      if((window as any).google){
        resolve(google.maps);
      } else if((window as any).listenToGoogleMapLoad) {
        (window as any).listenToGoogleMapLoad(() => {
          resolve(google.maps);
        });
      } else {
        reject();
      }
    })
  }

  initMap(mapElement) {
    return this.getGoogleMap().then(()=> this.getUserLocation()).then((location: GeoLocation) => {
      console.log('initMap: my location is', JSON.stringify(location));
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
    console.log('markProduct' + JSON.stringify(product.location))
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
