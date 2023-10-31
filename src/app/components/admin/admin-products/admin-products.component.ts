import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/data/products/product.service";
import {Category} from "../../../models/Category";
import {Product} from "../../../models/Product";
import {query} from "@angular/animations";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {PaginatorIntlService} from "../../../services/paginator/paginator-intl.service";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorIntlService}],
})
export class AdminProductsComponent implements OnInit, AfterViewInit{
  products:Array<Product>=[];
  filterProducts:Array<Product>=[];
  displayedColumns=["productName","productPrice","edytuj"];
  dataSource:MatTableDataSource<Product>=new MatTableDataSource<Product>(this.filterProducts);
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator|undefined;
  constructor(private router:ActivatedRoute,
              private productsService:ProductService,
              private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.productsService.getAll()
      .subscribe(
        {next:(body)=>{
            this.products = <Array<Product>>body;
            this.filterProducts=this.products;
            this.dataSource.data=this.filterProducts;
          },
          error:(error)=>{}})
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.sort = this.sort;
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
   //   this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
    //  this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
