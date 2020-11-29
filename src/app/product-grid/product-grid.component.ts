import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../classes/product";
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
}
