import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestProductDashboardComponent } from './best-product-dashboard.component';

describe('BestProductDashboardComponent', () => {
  let component: BestProductDashboardComponent;
  let fixture: ComponentFixture<BestProductDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestProductDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestProductDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
