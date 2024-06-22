import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDiagnogPage } from './user-diagnog.page';

describe('UserDiagnogPage', () => {
  let component: UserDiagnogPage;
  let fixture: ComponentFixture<UserDiagnogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDiagnogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
