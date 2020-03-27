import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import { iRFAClass, iModule, iEmployee, iRFAAssignment,iOpsSpec }  from '../models/rfaclass';
import { map } from "rxjs/operators";




// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};
@Injectable({
  providedIn: 'root'
})
export class RfaclassService {

  // url = 'http://10.34.9.14:3001/rfaclass';
  // escURL = 'http://10.34.9.14:3001/escalation/';
  // compEscURL = 'http://10.34.9.14:3001/completeescrfa/';
  // modulesURL = 'http://10.34.9.14:3001/modules';
  // modulesResourceURL = 'http://10.34.9.14:3001/modulesresources';
  // employeesURL = 'http://10.34.9.14:3001/employees';

  ip = "10.10.27.253";
  url = 'http://' + this.ip +':3001/rfaclass';
  escURL = 'http://' + this.ip +':3001/escalation/';
  compEscURL = 'http://' + this.ip +':3001/completeescrfa/';
  modulesURL = 'http://' + this.ip +':3001/modules';
  modulesResourceURL = 'http://' + this.ip +':3001/modulesresources';
  employeesURL = 'http://' + this.ip +':3001/employees';
  rfaAssignmentURL ='http://' + this.ip +':3001/rfaassign';
  opsSpecURL = 'http://' + this.ip +':3001/opsspec';
  isAvailURL = 'http://' + this.ip +':3001/isavail/';
  notAvailURL = 'http://' + this.ip +':3001/notavail/';
  

  allModules: Observable<iModule[]>; 
  allRFAAssignment: Observable<iRFAAssignment[]>
  
  constructor(private http: HttpClient) { 
  }

  //Get All RFA's
  public getAllRFA(): Observable<iRFAClass[]>{
  return this.http.get<iRFAClass[]>(this.url, httpOptions)
  }

  //Get Ops Spec RFA's
  public getOSRFA(): Observable<iRFAClass[]>{
    return this.http.get<iRFAClass[]>(this.url, httpOptions).pipe(map((response) => {response = response.filter((data) => data.rfatype.trim() !== "Database" && data.rfatype.trim() !== "Technical Support");
    return response }))}

  //Get DB RFA's
  public getDBRFA(): Observable<iRFAClass[]>{
    console.log("Inside the Post");
    return this.http.get<iRFAClass[]>(this.url, httpOptions).pipe(map((response) => {response = response.filter((data) => data.rfatype.trim() === "Database");
    return response }))}    
    
  //Get TS RFA's for Defect List
    public getTSRFA(): Observable<iRFAClass[]>{
      return this.http.get<iRFAClass[]>(this.url, httpOptions).pipe(map((response) => {response = response.filter((data) => data.rfatype.trim() === "Technical Support");
      return response }))}  
 
  //Escalate RFA 
  public escalateRFA(rfanum: number){
    console.log("Inside the Escalation");
    console.log("Service RFANUM Value: " + rfanum);
    var insertURL = this.escURL + rfanum; 
    console.log(insertURL);
   return this.http.post(insertURL,httpOptions).subscribe(data=> {
     console
   });
  }

  //Complete Escalation for RFA 
  public completeEscRFA(rfanum: number){
    console.log("Inside the Escalation");
    console.log("Service RFANUM Value: " + rfanum);
    var insertURL = this.compEscURL + rfanum; 
    console.log(insertURL);
   return this.http.delete(insertURL,httpOptions).subscribe(data=> {
     console
   });
  }

  //Get Modules for drop down
  public getModules(): Observable<iModule[]>{
    console.log('service run');
    this.allModules = this.http.get<iModule[]>(this.modulesURL, httpOptions);
    console.log(this.allModules.forEach(element => {          
    })
    )
    ; 
    return this.allModules; 
  }

  //Get Employee List
  public getEmployees(): Observable<iEmployee[]>{
    console.log('service run');
    return this.http.get<iEmployee[]>(this.employeesURL, httpOptions);
  }

  //Get rfa assignments
  public getRFAAssign(): Observable<iRFAAssignment[]>{
    return this.http.get<iRFAAssignment[]>(this.rfaAssignmentURL, httpOptions)
  }

  //Get all OpsSpec
  public getAllOpsSpec(): Observable<iOpsSpec[]>{
    return this.http.get<iOpsSpec[]>(this.opsSpecURL, httpOptions)
  }
  //OpsSpec is Available
  public isAvail(osnum: number){
    console.log("Available OS : " + osnum);
    var insertURL = this.isAvailURL + osnum; 
    console.log(insertURL);
   return this.http.put(insertURL,httpOptions).subscribe(data=> {
     console
   });
  }
  //OpsSpec is not available
  public notAvail(osnum: number){
    console.log("Unavailable OS : " + osnum);
    var insertURL = this.notAvailURL + osnum; 
    console.log(insertURL);
   return this.http.put(insertURL,httpOptions).subscribe(data=> {
     console
   });
  }
}
