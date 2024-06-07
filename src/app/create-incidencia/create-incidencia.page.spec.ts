import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateIncidenciaPage } from './create-incidencia.page';

describe('CreateIncidenciaPage', () => {
  let component: CreateIncidenciaPage;
  let fixture: ComponentFixture<CreateIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
