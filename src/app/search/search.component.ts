import { Component, OnInit } from '@angular/core';
import {Product} from '../../classes/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[];
  searchField;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
    this.activatedRoute.params.subscribe(params =>
      this.setParams(params)
    );
  }

  setParams(params) {
    this.searchField = params.searchField;
    console.log('searchField is: ' + this.searchField);
  }

  ngOnInit(): void {
    this.productService.getProducts()
    .then(products => this.products = products);
  }
}
