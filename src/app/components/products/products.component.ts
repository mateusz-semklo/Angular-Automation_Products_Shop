import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/data/products/product.service";
import {Product} from "../../models/Product";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CategoryService} from "../../services/data/categories/category.service";
import {Category} from "../../models/Category";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  categories: Array<Category> = [];
  categoryName: string | null = null;

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe({
        next: (body) => {
          this.products = body as Product[];
          this.filteredProducts = this.products;

          this.route.queryParamMap.subscribe((query) => {
            this.categoryName = query.get("category");
            console.log(this.categoryName);
            if(this.categoryName!=null) {
              this.filteredProducts = this.products.filter((product) => {
                return ( ((product.category) ? product.category.categoryName : null) === this.categoryName);
              })
            }else
              this.filteredProducts=this.products;
          })}})
  }

}
