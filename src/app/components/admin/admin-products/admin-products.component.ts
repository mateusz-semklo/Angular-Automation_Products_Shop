import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/data/products/product.service";
import {Category} from "../../../models/GET/Category";
import {Product} from "../../../models/GET/Product";
import {query} from "@angular/animations";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{
  products:Array<Product>=[];
  filterProducts:Array<Product>=[];
  displayedColumns=["productName","productPrice","edytuj"];
  constructor(private router:ActivatedRoute,private productsService:ProductService) {}

  filter(query:string){
    this.filterProducts=this.products;
    this.filterProducts=this.filterProducts.filter((product)=>{
      return product.productName.toLowerCase().includes(query.toLowerCase());
    })
  }

  ngOnInit(): void {
    this.productsService.getAll()
      .subscribe(
        {next:(body)=>{
            console.log("subscribe");
            this.products = <Array<Product>>body;
            this.filterProducts=this.products;
          },
          error:(error)=>{

          }
        }
      )
  }
}
