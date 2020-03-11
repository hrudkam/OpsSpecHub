import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iModule,iRFAClass,iEmployee } from 'src/app/models/rfaclass';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-templatebuilder',
  templateUrl: './templatebuilder.component.html',
  styleUrls: ['./templatebuilder.component.css']
})
export class TemplatebuilderComponent implements OnInit {

  dynamicForm: FormGroup;
  dynamicForSI: FormGroup;
  rfas: iRFAClass[];
  modules: iModule[]; 
  employees: iEmployee[];
  systemType: string[]=[
    'Acrosoft',
    'AirBase',
    'AnyDoc',
    'Claron',
    'Cloud Platform Services (Perceptive)',
    'Content (ImageNow)',
    'Content Composer (PDC)',
    'Global Cloud Services',
    'Intelligent Capture (Brainware)',
    'Media (Twistage)',
    'Nolij Web/DataTransfer',
    'OnBase',
    'OneContent',
    'PACSGEAR',
    'Portal',
    'Process (BPM)',
    'R4 Acert',
    'Saperion',
    'Search (ISYS)',
    'ShareBase',
    'SIRE',
    'Streamline ECM',
    'Universal Clinical Platform (Acuo)'
  ]

  constructor(
    private formBuilder: FormBuilder,
    private flashMessage: FlashMessagesService,
    private rfaClass: RfaclassService) { }

  ngOnInit() {
      this.dynamicForm = this.formBuilder.group({
          reviewedByOther: ['', Validators.required],
          reviewByName : ['', Validators.required],
          typeOfAssistance  : ['', Validators.required],
          backportRequest : ['', Validators.required],  
          resourcesReviewed : ['', Validators.required],
          resourcesReviewedSI : ['', Validators.required],
          resourcesReviewedSCR : ['', Validators.required],
          resourcesReviewedJIRA: ['', Validators.required],
          resourcesReviewedCommunity : ['', Validators.required],
          noResourcesReviewed : ['', Validators.required],
          siInput: ['', Validators.required],
          scrInput: ['', Validators.required],
          jiraInput: ['', Validators.required],
          communityInput: ['', Validators.required],
          rfaOther:['',Validators.required], 
          rfaQuestionGQ:['', Validators.required],
          replicatedLocally:['',Validators.required],
          scrFound:['',Validators.required],
          typeOfTS:['',Validators.required],
          typeOfModule:['',Validators.required],
          whatAreYouAsking:['',Validators.required],
          whatVersion:['',Validators.required],
          whatEnv:['',Validators.required],
          whatErrors:['',Validators.required],
          startIssue:['',Validators.required],
          whatFrequency:['',Validators.required],
          affectedUsers:['',Validators.required],
          whatSteps:['',Validators.required],
          diagnosticsLogs:['',Validators.required],
          diagnosticsLogLoc:['',Validators.required],
          logTimeID:['',Validators.required],
          logUserID:['',Validators.required],
          eventviewer:['',Validators.required],
          evLogLoc:['',Validators.required],
          evLogTimeID:['',Validators.required],
          systemType:['',Validators.required],
          rfaOtherTS:['',Validators.required],
          otherLogLoc:['',Validators.required],
          otherLogTimeID:['',Validators.required],
          noResourcesReviewedTS:['',Validators.required]

      });
      this.rfaClass.getModules().subscribe(data=>{this.modules = data;})

      this.rfaClass.getEmployees().subscribe(data=>{this.employees = data;})    
  }

  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }

  async getModules(){

  }

  onChangeSCRFound(e) {
    if(this.f.scrFound.value==='y'){
      this.flashMessage.show('Please use "What type of assistance are you requesting to General Question', {
        cssClass: 'alert-danger', timeout:4000
      });

      this.f.typeOfAssistance.setValue('y');
      this.f.replicatedLocally.setValue('');            
    }
    else{
    }
  }
  
  swapValue(value: string){
    if(value==='y')
    {
      return value = 'Yes'; 
    }
    if(value==='n')
    {
      return value = 'No'; 
    }
  }
  onReset() {
      // reset whole form back to initial state
      this.dynamicForm.reset();
      this.f.systemType.setValue(''); 
  }
  flashModuleURL(url: string){
    this.flashMessage.show('Please review the following Troubleshooting Guide before proceeding:'+ url, {
      cssClass: 'alert-danger', timeout:1000
    });
  }
}

