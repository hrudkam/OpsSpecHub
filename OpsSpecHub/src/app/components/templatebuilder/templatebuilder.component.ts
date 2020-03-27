import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iModule,iRFAClass,iEmployee } from 'src/app/models/rfaclass';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';


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
  filteredModule: iModule[]; 

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

      this.modules = []; 
      this.getAllModules(); 
      this.rfaClass.getEmployees().subscribe(data=>{this.employees = data;})    
      console.log("Init" + this.modules.length)
      
      this.f.systemType.setValue('OnBase');
      this.f.reviewedByOther.setValue('Yes');
      this.f.reviewByName.setValue('Alex Bell');
      this.f.typeOfAssistance.setValue('ts');
      this.f.replicatedLocally.setValue('y');
      this.f.scrFound.setValue('n');
      this.f.typeOfTS.setValue('error'); 


  }

  getAllModules() {
    this.rfaClass.getModules().subscribe(data => {data.forEach(element => {
      this.modules.push({functionality: element.functionality,resource: element.resource,systemtype: element.systemtype})
    });});
    this.filteredModule = this.modules

  }
  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }


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

  filterModules(systemtype: string){ 
    console.log(systemtype);
    console.log("Begin Filter" + this.modules.length)
    this.filteredModule = []
    if(this.modules){
      this.filteredModule = this.modules.filter((data) =>data.systemtype === systemtype)
      console.log("after filter" + this.modules.length)
    }
    else
    {
      this.getAllModules(); 
      this.modules = this.modules.filter((data) =>data.systemtype === systemtype)
      console.log("nope")
    }
    
  }

  copyForm(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.f.whatSteps.value;
    console.log(selBox.value)
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
