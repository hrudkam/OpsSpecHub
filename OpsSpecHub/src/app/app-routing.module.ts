import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RfaclassComponent } from './components/rfaclass/rfaclass.component';
import { OsrfaComponent } from './components/osrfa/osrfa.component';
import { DbrfaComponent } from './components/dbrfa/dbrfa.component';
import { EscalationsComponent } from './components/escalations/escalations.component';
import { DefectsComponent } from './components/defects/defects.component';
import { EscalationreqComponent } from './components/escalationreq/escalationreq.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { RFATemplatesComponent } from './components/rfatemplates/rfatemplates.component';
import { TemplatebuilderComponent } from './components/templatebuilder/templatebuilder.component';


const routes: Routes = [
  {path: '', component: RfaclassComponent},
  {path: 'osrfa', component: OsrfaComponent},
  {path: 'dbrfa', component: DbrfaComponent},
  {path: 'escalations', component: EscalationsComponent},
  {path: 'defects', component: DefectsComponent},
  {path: 'assignment', component: AssignmentComponent},
  {path: 'escalationreq/:id', component: EscalationreqComponent},
  {path: 'rfatemplates', component: RFATemplatesComponent},
  {path: 'templates', component: TemplatebuilderComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
