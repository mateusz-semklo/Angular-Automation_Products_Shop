import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/data/categories/category.service";
import {Category} from "../../../models/GET/Category";
import {Product} from "../../../models/GET/Product";
import {FormControl, FormGroup, RequiredValidator, Validators} from "@angular/forms";
import {ProductService} from "../../../services/data/products/product.service";
import {CustomFormsModule, CustomValidators} from 'ng2-validation'
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  constructor(private categoryService:CategoryService,
              private router:Router,
              private productService:ProductService) {

  }

  form:FormGroup=new FormGroup({
      productName: new FormControl('',Validators.required),
      productPrice: new FormControl('',[Validators.required,CustomValidators.min(0)]),
      productImageUrl: new FormControl('',[Validators.required,CustomValidators.url]),
      category: new FormControl('',Validators.required),
      productDescription: new FormControl('',Validators.required),
    }
  )

  categories:Array<Category>=[];
  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe(
        {next:(body)=>{
            this.categories = <Array<Category>>body;
          },
          error:(error)=>{

          }
        }
      )
  }

  create(){
    let product:Product=this.form.value;
    product.category.products=[];
    this.productService.create(product)
      .subscribe(
        {
          next:(result)=>{
            console.log(result);
            this.router.navigate(['/admin/products']);
          },
          error:(result)=>{
          }
        }
      )
  }

}
