import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/data/categories/category.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  constructor(public categoryService:CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((body)=>{
      console.log(body);
    })



  }



}
