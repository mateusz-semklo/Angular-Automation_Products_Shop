import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/data/categories/category.service";
import {Category} from "../../../models/Category";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit{

  categories:Array<Category>=[];
  @Input('category') categoryName: string|null=null;
  constructor(private categoryService:CategoryService,private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.categoryService.getAll()
      .subscribe({
        next: (body) => {
          this.categories = body as Category[];
        }})
  }

}
