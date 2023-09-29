import { Component , OnInit, ViewChild } from '@angular/core';
import { Funcionary } from '../model/Funcionary.model';
import { FuncionaryService } from '../services/funcionary.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FuncionaryCrudComponent } from '../funcionary-crud/funcionary-crud.component';
import { MatTableDataSource } from '@angular/material/table';
import { ArchivosComponent } from '../archivos/archivos.component';

interface CodigoToPalabraMapping {
  [codigo: string]: string;
}
@Component({
  selector: 'app-funcionarios-activos',
  templateUrl: './funcionarios-activos.component.html',
  styleUrls: ['./funcionarios-activos.component.scss']
})

export class FuncionariosActivosComponent implements OnInit {
 
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  selectedFuncionario: any; // Funcionario seleccionado
  showDetails = false;
  activeFilter: string = '';

  displayedColumns: string[] = ['id_funcionary', 'name', 'surnamefather','surnamemother', 'dni', 'phonenumber', 'rank', 'department', 'address', 'email', 'estado', 'acciones', 'detalles'];
  dataSource!: MatTableDataSource<Funcionary>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _fbService: FuncionaryService, private _coreService: CoreService, private http: HttpClient) {}

  ngOnInit() {
    this.getFuncionaryListActive()
  }

  getFuncionaryListActive() {
    this._fbService.getFuncionaryListActive().subscribe({
      next: (res: Funcionary[]) => {
        // Filtra los datos para mostrar solo los que tienen estado "A"
        const filteredData = res.filter(item => item.estado === 'A');
    
        // Asigna los datos filtrados a this.dataSource
        this.dataSource = new MatTableDataSource(filteredData);
    
        // Otros ajustes y configuraciones de la tabla
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  abrireditor() {
    const dialogRef = this._dialog.open(FuncionaryCrudComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFuncionaryListActive();
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: Funcionary) {
    const dialogRef = this._dialog.open(FuncionaryCrudComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFuncionaryListActive();
        }
      },
    });
  }

  deleteFuncionary(id: number) {
    this._fbService.deleteFuncionary(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getFuncionaryListActive();
      },
      error: console.log,
    });
  }

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
