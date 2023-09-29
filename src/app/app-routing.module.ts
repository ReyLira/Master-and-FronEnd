import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosActivosComponent } from './funcionarios-activos/funcionarios-activos.component';
import { FuncionariosInactivosComponent } from './funcionarios-inactivos/funcionarios-inactivos.component';
import { AppComponent } from './app.component';
import { FuncionariosAllComponent } from './funcionarios-all/funcionarios-all.component';

const routes: Routes = [
  { path: '', redirectTo: '/funcionarios-todos', pathMatch: 'full' },
  { path: 'funcionarios-todos', component: FuncionariosAllComponent }, // Esto puede ser diferente según tu estructura
  { path: 'funcionarios-activos', component: FuncionariosActivosComponent },
  { path: 'funcionarios-inactivos', component: FuncionariosInactivosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
