import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http'; 
import { iRFAClass, iModule, iEmployee }  from '../models/rfaclass';
import { map } from "rxjs/operators";



// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};
@Injectable({
  providedIn: 'root'
})
export class RfaclassService {

  url = 'http://10.34.9.14:3001/rfaclass';
  // url = 'http://10.50.12.136/rfacass'; 
  // url = 'http://localhost:3001/rfaclass';
  escURL = 'http://10.34.9.14:3001/escalation/';
  compEscURL = 'http://10.34.9.14:3001/completeescrfa/';
  modulesURL = 'http://10.34.9.14:3001/modules';
  modulesResourceURL = 'http://10.34.9.14:3001/modulesresources';
  employeesURL = 'http://10.34.9.14:3001/employees';
  
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
    return this.http.get<iModule[]>(this.modulesURL, httpOptions);
  }

  //Get Employee List
  public getEmployees(): Observable<iEmployee[]>{
    console.log('service run');
    return this.http.get<iEmployee[]>(this.employeesURL, httpOptions);
  }
}
