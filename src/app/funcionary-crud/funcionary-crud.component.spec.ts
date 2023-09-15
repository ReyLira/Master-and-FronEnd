import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionaryCrudComponent } from './funcionary-crud.component';

describe('FuncionaryCrudComponent', () => {
  let component: FuncionaryCrudComponent;
  let fixture: ComponentFixture<FuncionaryCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionaryCrudComponent]
    });
    fixture = TestBed.createComponent(FuncionaryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
