import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCart2Component } from './product-cart2.component';

describe('ProductCart2Component', () => {
  let component: ProductCart2Component;
  let fixture: ComponentFixture<ProductCart2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCart2Component]
    });
    fixture = TestBed.createComponent(ProductCart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
