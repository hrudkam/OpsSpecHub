import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RfaclassComponent } from './components/rfaclass/rfaclass.component';
import { HttpClientModule } from '@angular/common/http';
import { OsrfaComponent } from './components/osrfa/osrfa.component';
import { DbrfaComponent } from './components/dbrfa/dbrfa.component';
import { EscalationsComponent } from './components/escalations/escalations.component';
import { DefectsComponent } from './components/defects/defects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule,MatNativeDateModule  } from '@angular/material';
import { MatInputModule,MatStepperModule } from '@angular/material';
import { EscalationreqComponent } from './components/escalationreq/escalationreq.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule }   from '@angular/forms';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { RFATemplatesComponent } from './components/rfatemplates/rfatemplates.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TemplatebuilderComponent } from './components/templatebuilder/templatebuilder.component';
import { QuestionComponent } from './components/question/question.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RfaclassComponent,
    OsrfaComponent,
    DbrfaComponent,
    EscalationsComponent,
    DefectsComponent,
    EscalationreqComponent,
    AssignmentComponent,
    RFATemplatesComponent,
    TemplatebuilderComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
