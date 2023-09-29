import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosAllComponent } from './funcionarios-all.component';

describe('FuncionariosAllComponent', () => {
  let component: FuncionariosAllComponent;
  let fixture: ComponentFixture<FuncionariosAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionariosAllComponent]
    });
    fixture = TestBed.createComponent(FuncionariosAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
