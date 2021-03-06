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
  @Input() bought: boolean = false;
  @Input() user: any = {_id: '', username: 'anonymous'};
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    if (changes.products) {
      let products = changes.products.currentValue.map(product => (
        {...product, ...{base64: `data:${product.images[0].contentType};base64,${product.image}`}}
      ));
      if (this.bought) {
        this.products = products.filter(p => p.boughtBy === this.user._id);
      } else {
        this.products = products;
      }
    }
  }
}
