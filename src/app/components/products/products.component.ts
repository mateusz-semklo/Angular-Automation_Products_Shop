import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/data/products/product.service";
import {Product} from "../../models/Product";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CategoryService} from "../../services/data/categories/category.service";
import {Category} from "../../models/Category";
import {ActivatedRoute} from "@angular/router";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {Order} from "../../models/Order";
import {CartItem} from "../../models/CartItem";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {PaginatorIntlService} from "../../services/paginator/paginator-intl.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntlService}]
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  categories: Array<Category> = [];
  categoryName: string | null = null;
  cart: Order | null = null;
  viewProduct:boolean=false;

  displayedColumns=["productName"];
  dataSource:MatTableDataSource<Product>=new MatTableDataSource<Product>(this.filteredProducts);
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator|undefined;

  constructor(private productService: ProductService, private route: ActivatedRoute,private shoppingService:ShoppingCartService,private _liveAnnouncer: LiveAnnouncer) {
  }

  show1(){
    this.viewProduct=false;
  }

  show2(){
    this.viewProduct=true;
  }

  async ngOnInit(): Promise<void> {

    this.cart=await this.shoppingService.getOrCreateCart();
    await this.shoppingService.sendObservableQuantity();

    this.productService.getAll()
      .subscribe({
        next: (body) => {
          this.products = body as Product[];
          this.filteredProducts = this.products;
          this.dataSource.data=this.filteredProducts;

          this.route.queryParamMap.subscribe((query) => {
            this.categoryName = query.get("category");
            if (this.categoryName != null) {
              this.dataSource.data=this.filteredProducts = this.products.filter((product) => {
                return (((product.category) ? product.category.categoryName : null) === this.categoryName);
              })
            } else
              this.filteredProducts = this.products;
            this.dataSource.data=this.filteredProducts;
          })
        }
      })
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.sort = this.sort;
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }


}
