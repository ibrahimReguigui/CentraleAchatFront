import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeStatisticsComponent } from './vehicule-statistics.component';

describe('VehiculeStatisticsComponent', () => {
  let component: VehiculeStatisticsComponent;
  let fixture: ComponentFixture<VehiculeStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
