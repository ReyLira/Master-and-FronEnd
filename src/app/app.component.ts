import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuncionaryCrudComponent } from './funcionary-crud/funcionary-crud.component';
import { FuncionaryService } from './services/funcionary.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { Funcionary } from './model/Funcionary.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedFuncionario: any; // Funcionario seleccionado
  showDetails = false;

  displayedColumns: string[] = ['id_funcionary', 'name', 'surname', 'dni', 'phonenumber', 'rank', 'department', 'address', 'email', 'estado', 'action'];
  dataSource!: MatTableDataSource<Funcionary>;

  activeFilter: string | null = null;
  funcionaryData: Funcionary[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _fbService: FuncionaryService, private _coreService: CoreService) { }


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

  // Método para aplicar el filtro
  FiltradoActivos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    let filteredData = this.funcionaryData; // Usa tus datos reales aquí

    if (this.activeFilter === 'A') {
      filteredData = filteredData.filter((row) => row.estado.toLowerCase() === 'A');
    } else if (this.activeFilter === 'I') {
      filteredData = filteredData.filter((row) => row.estado.toLowerCase() === 'I');
    }

    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator; // Si estás utilizando paginación
  }
  
}
