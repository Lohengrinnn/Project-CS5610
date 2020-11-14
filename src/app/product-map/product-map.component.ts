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
  products: Product[];
  @ViewChild('productMap') el: ElementRef;

  constructor(
    private mapService: MapService,
    private productService: ProductService
  ) {
    this.mapService = mapService;
    this.productService = productService;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('products', this.products);
    this.mapService.initMap(this.el).then(() => {
      this.productService.getProducts()
        .then(products => this.mapService.markProducts(this.products));
    });
  }
}
