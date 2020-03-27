import { Component, OnInit,ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iRFAAssignment } from 'src/app/models/rfaclass';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private rfaClass: RfaclassService
  ) { }

  rfaAssign: iRFAAssignment[];
  dataSource = new MatTableDataSource<iRFAAssignment>() 
  dataSourceLog = new MatTableDataSource<iRFAAssignment>() 
  displayedColumns: string[] =[
    "rfanum",
    "sinum",
    "assignment",
    "responsible",
    "functionality",
    "summary",
    "type",
    "severity"
  ]

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.rfaAssign = []; 
    this.getAssignment();  
    this.dataSource.sort = this.sort;     
  }

  public getAssignment(){    
    this.rfaClass.getRFAAssign().subscribe(data=> 
      { 
        // add elements to the array. 
        data.forEach(element => {
          this.rfaAssign.push({rfanum:element.rfanum,sinum:element.sinum, assignment:element.assignment,responsible:element.responsible,functionality:element.functionality, summary:element.summary, type:element.type, severity:element.severity})
        });  
        this.dataSource.data = this.rfaAssign.filter(data =>(data.responsible.trim() === null || data.responsible.trim() === "") );  
        this.dataSourceLog.data = this.rfaAssign
        console.log("TEST")
        //Display message that an RFA needs to be taken over.
        this.rfaAssign.forEach(element => {
          if(!element.responsible)
          {
            this.flashMessages(element.rfanum.toString(),element.sinum.toString(),element.assignment.toString())
          }
          
        });
      }      
    )    
}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterLog(filterValue: string) {
    this.dataSourceLog.filter = filterValue.trim().toLowerCase();
  }

  flashMessages(rfanum: string, sinum: string, assignment: string){
    this.flashMessage.show('Please review new RFA Assignments: '+"<br/>"+ "SI# " + sinum + " RFA# " + rfanum + "<br/>"+" Assigned To " + assignment, {
      cssClass: 'alert-danger', timeout:10000
    });
  }

}
