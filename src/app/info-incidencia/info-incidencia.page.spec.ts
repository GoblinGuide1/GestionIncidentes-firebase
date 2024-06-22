import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoIncidenciaPage } from './info-incidencia.page';

describe('InfoIncidenciaPage', () => {
  let component: InfoIncidenciaPage;
  let fixture: ComponentFixture<InfoIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
