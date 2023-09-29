import { Component, OnInit, ViewChild } from '@angular/core';
import { Funcionary } from '../model/Funcionary.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FuncionaryService } from '../services/funcionary.service';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';
import { FuncionaryCrudComponent } from '../funcionary-crud/funcionary-crud.component';
import { ArchivosComponent } from '../archivos/archivos.component';

@Component({
  selector: 'app-funcionarios-all',
  templateUrl: './funcionarios-all.component.html',
  styleUrls: ['./funcionarios-all.component.scss']
})
export class FuncionariosAllComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  selectedFuncionario: any; // Funcionario seleccionado
  showDetails = false;
  visibility = true;

  displayedColumns: string[] = ['id_funcionary', 'name', 'surnamefather','surnamemother', 'dni', 'phonenumber', 'rank', 'department', 'address', 'email', 'estado', 'acciones', 'detalles'];
  dataSource!: MatTableDataSource<Funcionary>;

  activeFilter: string = '';
  funcionaryData: Funcionary[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _fbService: FuncionaryService, private _coreService: CoreService, private http: HttpClient) { }


  ngOnInit(): void {
    this.getFuncionaryList();
  }

  abrireditor() {
    const dialogRef = this._dialog.open(FuncionaryCrudComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFuncionaryList();
        }
      }
    })
  }

  getFuncionaryList() {
    this._fbService.getFuncionaryList().subscribe({
      next: (res: Funcionary[]) => {
        // Convierte el campo id_funcionary a números
        res.forEach((item) => {
          item.id_funcionary = +item.id_funcionary;
        });
    
        this.funcionaryData = res; // Asigna los datos
        this.dataSource = new MatTableDataSource(res);
        this.visibility = false;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFuncionary(id: number) {
    this._fbService.deleteFuncionary(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getFuncionaryList();
      },
      error: console.log,
    });
  }

  openEditForm(data: Funcionary) {
    const dialogRef = this._dialog.open(FuncionaryCrudComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFuncionaryList();
        }
      },
    });
  }

  reactivateFuncionario(id: number) {
    this._fbService.reactiveFuncionary(id).subscribe({
      next: (res) => {
        // Aquí puedes manejar la respuesta si es necesario
        console.log('Funcionario reactivado exitosamente', res);
        // Después de reactivar, puedes actualizar la lista de funcionarios activos si es necesario
        this.getFuncionaryList();
      },
      error: (err) => {
        console.error('Error al reactivar funcionario', err);
        // Maneja el error de acuerdo a tus necesidades
      }
    });
  }


  // Método para mostrar los detalles del funcionario
  showFuncionarioDetails(funcionario: any) {
    this.selectedFuncionario = funcionario;
    this.showDetails = true;
  }

  // Método para cerrar los detalles
  closeDetails() {
    this.selectedFuncionario = null;
    this.showDetails = false;
  }
  
  openArchivosDialog(dni: string) {
    const dialogRef = this._dialog.open(ArchivosComponent, {
      data: { dni: dni },
      width: '50%', // Personaliza el ancho según tus necesidades
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
