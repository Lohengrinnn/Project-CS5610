import {GeoLocation} from "./location";

export interface Product {
  _id: number;
  name: string;
  type: string,
  price: number,
  description: string,
  address: string,
  location: GeoLocation,
  owner: string,
  image: object
}


