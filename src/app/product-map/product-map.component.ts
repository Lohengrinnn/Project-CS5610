import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-product-map',
  templateUrl: './product-map.component.html',
  styleUrls: ['./product-map.component.css'],
})
export class ProductMapComponent implements OnInit {
  @Input() products: Product[];
  @ViewChild('productMap') el: ElementRef;
  mapInited: boolean = false;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}


  ngAfterViewInit(): void {
    this.mapService.initMap(this.el).then(() => {
      this.mapInited = true;
      this.markProducts()
    })
  }

  markProducts(): void {
    if(this.products.length && this.mapInited){
      this.mapService.markProducts(this.products);
      this.productsMarked = true;
    }
  }

  ngOnChanges(changes) {
    this.products = changes.products.currentValue;
    this.markProducts();
  }
}
