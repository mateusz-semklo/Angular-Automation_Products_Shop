import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersComponent } from './user-orders.component';

describe('MyOrdersComponent', () => {
  let component: UserOrdersComponent;
  let fixture: ComponentFixture<UserOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOrdersComponent]
    });
    fixture = TestBed.createComponent(UserOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
