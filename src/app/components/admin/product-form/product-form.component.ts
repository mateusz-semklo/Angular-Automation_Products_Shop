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
  id:string|null=null;

  constructor(private categoryService:CategoryService,
              private router:Router,
              private productService:ProductService,
              private route:ActivatedRoute) {}

  form:FormGroup=new FormGroup({
      productName: new FormControl('',Validators.required),
      productPrice: new FormControl('',[Validators.required,CustomValidators.min(0)]),
      productImageUrl: new FormControl('',[Validators.required,CustomValidators.url]),
      productDescription: new FormControl('',Validators.required),
      category: new FormGroup(
        {
          categoryName:new FormControl('',Validators.required)
        }
      )
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

    this.id=this.route.snapshot.paramMap.get("id");
    console.log("paramMap.id: "+this.id);

    if(this.id) {
      this.productService.getById(this.id)
        .subscribe({
          next: (body) => {
            this.product = <Product>body;
            this.form.get("productName")?.setValue(this.product.productName);
            this.form.get("productPrice")?.setValue(this.product.productPrice);
            this.form.get("productDescription")?.setValue(this.product.productDescription);
            this.form.get("productImageUrl")?.setValue(this.product.productImageUrl);
            this.form.get("category.categoryName")?.setValue(this.product.category.categoryName);
          },
          error: (error) => {
          }})
    }
  }

  create() {
    if(this.id==null) {
      console.log("create: "+this.id);
      this.productService.create(this.form.value as Product)
        .subscribe(
          {
            next: (result) => {
              console.log(result);
              this.router.navigate(['/admin/products']);
            },
            error: (result) => {
            }
          })
    }
    else {
      console.log("update: "+this.id);
      this.productService.update(this.form.value as Product, this.id as string)
        .subscribe(
          {
            next: (result) => {
              console.log(result);
              this.router.navigate(['/admin/products']);
            },
            error: (result) => {
            }
          })
    }
  }
}
