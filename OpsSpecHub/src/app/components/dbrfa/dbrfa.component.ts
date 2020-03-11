import { Component, OnInit, ViewChild } from '@angular/core';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iRFAClass }  from '../../models/rfaclass';
import { MatTableDataSource } from '@angular/material';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-dbrfa',
  templateUrl: './dbrfa.component.html',
  styleUrls: ['./dbrfa.component.css']
})
export class DbrfaComponent implements OnInit {
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
    "responsible",
    "category",
    "maint",
    "escalated"
  ]
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.getDBRFA();  
    this.dataSource.sort = this.sort;     
  }

  public getDBRFA(){    
    this.rfaClass.getDBRFA().subscribe(data=> {this.rfas = data; this.dataSource.data = this.rfas});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
