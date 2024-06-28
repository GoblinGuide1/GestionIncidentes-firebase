import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRolesPage } from './admin-roles.page';

describe('AdminRolesPage', () => {
  let component: AdminRolesPage;
  let fixture: ComponentFixture<AdminRolesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
