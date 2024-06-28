import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRolesPage } from './create-roles.page';

describe('CreateRolesPage', () => {
  let component: CreateRolesPage;
  let fixture: ComponentFixture<CreateRolesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
