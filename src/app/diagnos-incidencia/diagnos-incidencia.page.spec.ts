import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosIncidenciaPage } from './diagnos-incidencia.page';

describe('DiagnosIncidenciaPage', () => {
  let component: DiagnosIncidenciaPage;
  let fixture: ComponentFixture<DiagnosIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
