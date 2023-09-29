import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosInactivosComponent } from './funcionarios-inactivos.component';

describe('FuncionariosInactivosComponent', () => {
  let component: FuncionariosInactivosComponent;
  let fixture: ComponentFixture<FuncionariosInactivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionariosInactivosComponent]
    });
    fixture = TestBed.createComponent(FuncionariosInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
