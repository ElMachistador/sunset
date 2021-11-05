import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompagniesComponent } from './compagnies/compagnies.component';
import { CreateComponent } from './create/create.component';
import { DocumentsComponent } from './documents/documents.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { LostComponent } from './lost/lost.component';
import { MyflightsComponent } from './myflights/myflights.component';
import { ReportComponent } from './report/report.component';
import { TrainingComponent } from './training/training.component';
import { TurnaroundComponent } from './turnaround/turnaround.component';

import { IsConnectedGuard } from './guard';
import { HistoricComponent } from './historic/historic.component';
import { HistoricSupComponent } from './historic-sup/historic-sup.component';

const routes: Routes = [
  { path: '', redirectTo: 'myflights', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'turnaround', component: TurnaroundComponent },
  { path: 'compagnies', component: CompagniesComponent },
  { path: 'create', component: CreateComponent, canActivate: [IsConnectedGuard] },
  { path: 'turnaround/:id', component: TurnaroundComponent },
  { path: 'create/:id', component: CreateComponent },
  { path: 'myflights', component: MyflightsComponent },
  { path: 'info/:iata', component: InfoComponent },
  { path: 'info/:iata/:id', component: InfoComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'report', component: ReportComponent },
  { path: 'lost', component: LostComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'historic', component: HistoricComponent },
  { path: 'master', component: HistoricSupComponent },
  { path: 'turnaround/historic/:id', component: TurnaroundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
