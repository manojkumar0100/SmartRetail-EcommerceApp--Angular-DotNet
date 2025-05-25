import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminloginLoadingComponent } from './adminlogin-loading.component';

describe('AdminloginLoadingComponent', () => {
  let component: AdminloginLoadingComponent;
  let fixture: ComponentFixture<AdminloginLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminloginLoadingComponent]
    });
    fixture = TestBed.createComponent(AdminloginLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
