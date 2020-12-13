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
  @Input() user: any = {_id: '', username: 'anonymous'};
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    this.products = changes.products.currentValue.map(product => (
      {...product, ...{base64: `data:${product.images[0].contentType};base64,${product.image}`}}
    ));
  }
}
