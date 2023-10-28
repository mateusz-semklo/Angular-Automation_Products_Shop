import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/data/products/product.service";
import {Category} from "../../../models/GET/Category";
import {Product} from "../../../models/GET/Product";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{
  products:Array<Product>=[];
  constructor(private router:ActivatedRoute,private productsService:ProductService) {
  }

  ngOnInit(): void {
    this.productsService.getAll()
      .subscribe(
        {next:(body)=>{
            this.products = <Array<Product>>body;
          },
          error:(error)=>{

          }
        }
      )
  }

}
