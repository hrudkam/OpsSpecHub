import { Component, OnInit, ViewChild } from '@angular/core';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iRFAClass }  from '../../models/rfaclass';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-rfaclass',
  templateUrl: './rfaclass.component.html',
  styleUrls: ['./rfaclass.component.css']
})
export class RfaclassComponent implements OnInit {  
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
    "approved",
    "escalated"
  ]
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.getAllRFA();  
    this.dataSource.sort = this.sort;     
  }

  public getAllRFA(){    
    this.rfaClass.getAllRFA().subscribe(data=> {this.rfas = data; this.dataSource.data = this.rfas});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
