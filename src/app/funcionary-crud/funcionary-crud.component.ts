import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionaryService } from '../services/funcionary.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-funcionary-crud',
  templateUrl: './funcionary-crud.component.html',
  styleUrls: ['./funcionary-crud.component.scss']
})
export class FuncionaryCrudComponent implements OnInit {

  funForm: FormGroup;

  constructor(private _fb: FormBuilder, private _fbService: FuncionaryService, private _dialogRef: MatDialogRef<FuncionaryCrudComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService) {
    this.funForm = this._fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.maxLength(8)]],
      phonenumber: ['', [Validators.required, Validators.maxLength(9)]],
      rank: ['', Validators.required],
      department: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.funForm.patchValue(this.data);
  }


  onFormSubmit() {
    if (this.funForm.valid) {
      // Verificar si id_funcionary es un número válido
      const idFuncionary = parseInt(this.data.id_funcionary, 10);
      
      if (!isNaN(idFuncionary)) {
        if (this.data) {
          this._fbService
            .updateFuncionary(idFuncionary, this.funForm.value)
            .subscribe({
              next: (val: any) => {
                this._coreService.openSnackBar('Funcionario Actualizado');
                this._dialogRef.close(true);
              },
              error: (err: any) => {
                console.error(err);
              },
            });
        } else {
          this._fbService.addFuncionary(this.funForm.value).subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Funcionario Agregado');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      } else {
        // Manejar el caso en que id_funcionary no es un número válido
        console.error('id_funcionary no es un número válido');
      }
    }
  }
}
