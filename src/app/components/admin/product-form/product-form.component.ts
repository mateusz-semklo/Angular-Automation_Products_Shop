import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/data/categories/category.service";
import {Category} from "../../../models/GET/Category";
import {Product} from "../../../models/GET/Product";
import {FormControl, FormGroup, RequiredValidator, Validators} from "@angular/forms";
import {ProductService} from "../../../services/data/products/product.service";
import {CustomFormsModule, CustomValidators} from 'ng2-validation'
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  categories:Array<Category>=[];
  product:Product=new Product();
  constructor(private categoryService:CategoryService,
              private router:Router,
              private productService:ProductService,
              private route:ActivatedRoute) {}

  form:FormGroup=new FormGroup({
      productName: new FormControl('',Validators.required),
      productPrice: new FormControl('',[Validators.required,CustomValidators.min(0)]),
      productImageUrl: new FormControl('',[Validators.required,CustomValidators.url]),
      category: new FormControl('',Validators.required),
      productDescription: new FormControl('',Validators.required),
    }
  )
  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe(
        {next:(body)=>{
            this.categories = <Array<Category>>body;
          },
          error:(error)=>{
          }})

    let id=this.route.snapshot.paramMap.get("id");
    if(id){
      this.productService.getById(id)
        .subscribe({next:(body)=>{
            this.product=<Product>body;
            this.form.get("productName")?.setValue(this.product.productName);
            this.form.get("productPrice")?.setValue(this.product.productPrice);
            this.form.get("productDescription")?.setValue(this.product.productDescription);
            this.form.get("productImageUrl")?.setValue(this.product.productImageUrl);
            this.form.get("productCategory")?.setValue(this.product.category);
          },
          error:(error)=>{
          }})
    }
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
          }})
  }

}
