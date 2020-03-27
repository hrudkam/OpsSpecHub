import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RfaclassComponent } from './components/rfaclass/rfaclass.component';
import { OsrfaComponent } from './components/osrfa/osrfa.component';
import { DbrfaComponent } from './components/dbrfa/dbrfa.component';
import { EscalationsComponent } from './components/escalations/escalations.component';
import { DefectsComponent } from './components/defects/defects.component';
import { EscalationreqComponent } from './components/escalationreq/escalationreq.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { TemplatebuilderComponent } from './components/templatebuilder/templatebuilder.component';
import { OpsspecComponent } from './components/opsspec/opsspec.component';
import { OpsspecDetailComponent } from './components/opsspec-detail/opsspec-detail.component';


const routes: Routes = [
  {path: '', component: RfaclassComponent},
  {path: 'osrfa', component: OsrfaComponent},
  {path: 'dbrfa', component: DbrfaComponent},
  {path: 'escalations', component: EscalationsComponent},
  {path: 'defects', component: DefectsComponent},
  {path: 'assignment', component: AssignmentComponent},
  {path: 'escalationreq/:id', component: EscalationreqComponent},
  {path: 'templates', component: TemplatebuilderComponent},
  {path: 'opsspec', component: OpsspecComponent},
  {path: 'opsspec/:id', component: OpsspecDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
