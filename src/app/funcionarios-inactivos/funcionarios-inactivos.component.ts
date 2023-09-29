import { Component , OnInit , ViewChild} from '@angular/core';
import { Funcionary } from '../model/Funcionary.model';
import { FuncionaryService } from '../services/funcionary.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuncionaryCrudComponent } from '../funcionary-crud/funcionary-crud.component';
import { ArchivosComponent } from '../archivos/archivos.component';

@Component({
  selector: 'app-funcionarios-inactivos',
  templateUrl: './funcionarios-inactivos.component.html',
  styleUrls: ['./funcionarios-inactivos.component.scss']
})
export class FuncionariosInactivosComponent  implements OnInit{

  funcionaryData: Funcionary[] = [];

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  selectedFuncionario: any; // Funcionario seleccionado
  showDetails = false;
  activeFilter: string = '';

  displayedColumns: string[] = ['id_funcionary', 'name', 'surnamefather','surnamemother', 'dni', 'phonenumber', 'rank', 'department', 'address', 'email', 'estado', 'action'];
  dataSource!: MatTableDataSource<Funcionary>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _fbService: FuncionaryService, private _coreService: CoreService, private http: HttpClient) {}

  ngOnInit() {
    this.getFuncionaryListInactive();
  }

  getFuncionaryListInactive() {
    this._fbService.getFuncionaryListInactive().subscribe({
      next: (res: Funcionary[]) => {
        // Filtra los datos para mostrar solo los que tienen estado "I"
        const filteredData = res.filter(item => item.estado === 'I');
    
        // Asigna los datos filtrados a this.dataSource
        this.dataSource = new MatTableDataSource(filteredData);
    
        // Otros ajustes y configuraciones de la tabla
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  reactivateFuncionario(id: number) {
    this._fbService.reactiveFuncionary(id).subscribe({
      next: (res) => {
        // Aquí puedes manejar la respuesta si es necesario
        console.log('Funcionario reactivado exitosamente', res);
        // Después de reactivar, puedes actualizar la lista de funcionarios activos si es necesario
        this.getFuncionaryListInactive();
      },
      error: (err) => {
        console.error('Error al reactivar funcionario', err);
        // Maneja el error de acuerdo a tus necesidades
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


  showFuncionarioDetails(funcionario: any) {
    this.selectedFuncionario = funcionario;
    this.showDetails = true;
  }

  // Método para cerrar los detalles
  closeDetails() {
    this.selectedFuncionario = null;
    this.showDetails = false;
  }


  
}
