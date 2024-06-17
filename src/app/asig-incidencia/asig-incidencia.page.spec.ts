import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsigIncidenciaPage } from './asig-incidencia.page';

describe('AsigIncidenciaPage', () => {
  let component: AsigIncidenciaPage;
  let fixture: ComponentFixture<AsigIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsigIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
