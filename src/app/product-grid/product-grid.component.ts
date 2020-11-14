import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../classes/product";

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  @Input() products: Product[];
  @Input() publish: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
}
