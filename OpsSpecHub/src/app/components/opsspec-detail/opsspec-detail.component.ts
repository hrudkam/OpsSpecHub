import { Component, OnInit,ViewChild } from '@angular/core';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iRFAClass,iOpsSpec } from 'src/app/models/rfaclass';
import { MatTableDataSource, MatTab } from '@angular/material';
import { Router, ActivatedRoute, Params } from
'@angular/router';
import {MatSort} from '@angular/material/sort';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-opsspec-detail',
  templateUrl: './opsspec-detail.component.html',
  styleUrls: ['./opsspec-detail.component.css']
})
export class OpsspecDetailComponent implements OnInit {

  constructor(
    private rfaClass: RfaclassService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  id: number;
  rfas: iRFAClass[];
  opsSpecs: iOpsSpec[];
  allRFA: iRFAClass[];
  dataSource = new MatTableDataSource<iRFAClass>()
  displayedColumns: string[] =[
    "rank",
    "total",
    "rfanum",
    "sinum",
    "responsible",
    "functionality",
    "summary",
    "type",
    "severity"
  ]
  defect: iRFAClass[];
  defectDataSource = new MatTableDataSource<iRFAClass>()
  rfaRD: number;
  rfaDefect:number;
  selectedVal: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    //Get ID From url
    this.id = this.route.snapshot.params['id'];
    this.rfas = [];
    this.opsSpecs =[];
    this.allRFA =[];
    this.defect=[];
    this.dataSource.sort = this.sort;
    this.defectDataSource.sort = this.sort;
    this.getAllOpsSpec();
    this.getAllRFAs();    
    this.getDefects();
  }

  getAllOpsSpec(){
    this.rfaClass.getAllOpsSpec().subscribe(data=>
      {
        data.forEach(element=>{
          this.opsSpecs.push({opsspecnum:element.opsspecnum, osfullname:element.osfullname,isavailable:element.isavailable})
        })
        this.opsSpecs = this.opsSpecs.filter(data=>data.opsspecnum == this.id);
        console.log(data[0].opsspecnum);
        console.log("ID Value: "+ this.id);
        console.log("OpSpec Length: "+ this.opsSpecs.length)
        //Set OpsSpec Available Button
        this.selectedVal = this.isAvailable(this.opsSpecs[0].isavailable)
        console.log("Selected Value Default " + this.selectedVal)
      })
  }

  getAllRFAs(){
    this.rfaClass.getAllRFA().subscribe(data=>
      {
        data.forEach(element=>{
         this.allRFA.push({rfanum:element.rfanum,sinum:element.sinum,hsi:element.hsi,customer:element.customer,functionality:element.functionality,summary:element.summary,siowner:element.siowner,responsible:element.responsible,approved:element.approved,rfastatus:element.rfastatus,rfatype:element.rfatype,severity:element.severity, total:element.total})
        })
        this.dataSource.data = this.allRFA.filter(data =>(
          (data.responsible.trim() === this.opsSpecs[0].osfullname
          || data.approved.trim() === this.opsSpecs[0].osfullname )
          && data.rfatype.trim() !== 'Database' && data.rfatype.trim() !== 'Technical Support'
        ))
        console.log(data[0].severity)
        console.log(data.length);
        this.rfaRD = this.dataSource.data.length;
      })
  }

  getDefects(){
    this.rfaClass.getTSRFA().subscribe(data=>
      {
        data.forEach(element=>{
         this.defect.push({rfanum:element.rfanum,sinum:element.sinum,hsi:element.hsi,customer:element.customer,functionality:element.functionality,summary:element.summary,siowner:element.siowner,responsible:element.responsible,approved:element.approved,rfastatus:element.rfastatus,rfatype:element.rfatype,severity:element.severity})
        })
        this.defectDataSource.data = this.defect.filter(data =>(
          data.responsible.trim() === this.opsSpecs[0].osfullname
          || data.approved.trim() === this.opsSpecs[0].osfullname 
        ))
        console.log(data[0].severity)
        console.log(data.length);
        this.rfaDefect = this.defectDataSource.data.length;
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterDefect(filterValue: string) {
    this.defectDataSource.filter = filterValue.trim().toLowerCase();
  }

  isAvailable(value: number){
    if(value===1){
      return "avail"; 
    }
    else{
      return "notavail";
    }
  }

  //Set availability of analyst. 
  makeAvailable(){
    if(this.selectedVal === 'avail'){
      this.selectedVal = 'notavail';
      console.log("I will switch to unavailable");
      this.rfaClass.notAvail(Number(this.id)); 
      this.flashMessage.show(this.opsSpecs[0].osfullname+' is no longer available and will not receive new RFAs', {
        cssClass: 'alert-danger', timeout:4000
      });
    }
    else{
      this.selectedVal = 'avail';
      console.log("I will switch to available");
      this.rfaClass.isAvail(Number(this.id)); 
      this.flashMessage.show(this.opsSpecs[0].osfullname+' is now  available and will receive new RFAs', {
        cssClass: 'alert-success', timeout:4000
      });
    }
    
  }

}
