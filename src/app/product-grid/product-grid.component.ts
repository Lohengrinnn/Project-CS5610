import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  @Input() products: any[];
  @Input() publish: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    this.products = changes.products.currentValue;
    this.products.forEach(product => {
      product.images[0].base64 = btoa(product.images[0].data.data)
      console.log(product.images[0].contentType + " " + product.images[0].base64.length)
    })
  }
}
