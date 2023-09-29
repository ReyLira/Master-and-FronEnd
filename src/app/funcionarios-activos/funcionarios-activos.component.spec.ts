import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosActivosComponent } from './funcionarios-activos.component';

describe('FuncionariosActivosComponent', () => {
  let component: FuncionariosActivosComponent;
  let fixture: ComponentFixture<FuncionariosActivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionariosActivosComponent]
    });
    fixture = TestBed.createComponent(FuncionariosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
