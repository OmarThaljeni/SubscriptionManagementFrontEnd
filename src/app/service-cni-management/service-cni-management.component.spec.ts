import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCniManagementComponent } from './service-cni-management.component';

describe('ServiceCniManagementComponent', () => {
  let component: ServiceCniManagementComponent;
  let fixture: ComponentFixture<ServiceCniManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCniManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCniManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
