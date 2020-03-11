import { Component, OnInit, ViewChild } from '@angular/core';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iRFAClass }  from '../../models/rfaclass';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.css']
})
export class DefectsComponent implements OnInit {
  constructor( private rfaClass: RfaclassService) { }
  rfas: iRFAClass[];
  dataSource = new MatTableDataSource<iRFAClass>() 
  displayedColumns: string[] =[
    "rank",
    "total",
    "rfanum",
    "sinum",
    "customer",
    "functionality",
    "summary",
    "siowner",
    "rfatype",
    "responsible",
    "escalated"
  ]
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.getTSRFA();  
    this.dataSource.sort = this.sort;     
  }

  public getTSRFA(){    
    this.rfaClass.getTSRFA().subscribe(data=> {this.rfas = data; this.dataSource.data = this.rfas});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}