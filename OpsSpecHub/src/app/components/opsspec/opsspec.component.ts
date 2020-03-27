import { Component, OnInit } from '@angular/core';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iOpsSpec, iRFAClass } from 'src/app/models/rfaclass';
import { OsrfaComponent } from '../osrfa/osrfa.component';

@Component({
  selector: 'app-opsspec',
  templateUrl: './opsspec.component.html',
  styleUrls: ['./opsspec.component.css']
})
export class OpsspecComponent implements OnInit {

  opsSpecs: iOpsSpec[];
  allRFA: iRFAClass[];
  osRFA: iRFAClass[];
  rdRFA: iRFAClass[];
  defect: iRFAClass[]; 

  constructor(
    private rfaClass: RfaclassService
  ) { }

  ngOnInit() {
    this.opsSpecs =[];
    this.allRFA =[];
    this.osRFA =[];
    this.rdRFA = []
    this.defect = [];
    this.getAllOpsSpec();
    this.getAllRFAs();
  }

  getAllOpsSpec(){
    this.rfaClass.getAllOpsSpec().subscribe(data=>
      {
        data.forEach(element=>{
          this.opsSpecs.push({opsspecnum:element.opsspecnum, osfullname:element.osfullname,isavailable:element.isavailable})
        })
        console.log(data.length);
      })
  }

  getAllRFAs(){
    this.rfaClass.getAllRFA().subscribe(data=>
      {
        data.forEach(element=>{
         this.allRFA.push({rfanum:element.rfanum,sinum:element.sinum,hsi:element.hsi,customer:element.customer,functionality:element.functionality,summary:element.summary,siowner:element.siowner,responsible:element.responsible,approved:element.approved,rfastatus:element.rfastatus,rfatype:element.rfatype})
        })
        console.log(data.length);
      })
  }

  getTotalRFA(opsspec: string){
    if(this.allRFA){
      this.osRFA = this.allRFA.filter(rfa=>
        (rfa.responsible.trim() ===opsspec
        || rfa.approved.trim() === opsspec)
        && rfa.rfatype.trim() !=='Database');
      return this.osRFA.length;
    }
    else{console.log("failed")};
  }

  getRDRFA(opsspec: string){
    if(this.allRFA){
      this.rdRFA = this.allRFA.filter(rfa=> rfa.rfatype.trim() === 'R&D' &&(rfa.responsible.trim()===opsspec || rfa.approved.trim()===opsspec));
      return this.rdRFA.length;
    }
    else{console.log("failed")};
  }

  getDefects(opsspec: string){
    if(this.allRFA){
      this.defect = this.allRFA.filter(rfa=> rfa.rfatype.trim() === 'Technical Support' &&(rfa.responsible.trim()===opsspec || rfa.approved.trim()===opsspec));
      return this.defect.length;
    }
    else{console.log("failed")};
  }

  isAvailable(value: number){
    if(value===1){
      return "Available"; 
    }
    else{
      return "Not Available";
    }
  }

}
