import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from 
'@angular/router'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { RfaclassService } from 'src/app/services/rfaclass.service';
import { iRFAClass }  from '../../models/rfaclass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-escalationreq',
  templateUrl: './escalationreq.component.html',
  styleUrls: ['./escalationreq.component.css']
})


export class EscalationreqComponent implements OnInit {
  
  id: string;
  rfas: iRFAClass[]
  urgency: number; 

  @ViewChild('escForm', { static: false }) form: any;
  @ViewChild('escManager', { static: false }) escManager: any;

  constructor(
    private flashMessage: FlashMessagesService, 
    private router: Router,
    private route: ActivatedRoute,
    private rfaClass: RfaclassService,
    private http: HttpClient
  ) { }

  myControl = new FormControl();
  options: string[] = [
    'Allison Burke',
'Amanda Hrudka',
'Andrew Langford',
'Andy Rusnak',
'Anthony Sasso',
'Beatrice Mustelier-Pennewiss',
'Brandon Chesla',
'Brian Banaria',
'Brian Milicic',
'Brian Palmer',
'Chase Davis',
'Chris Arpajian',
'Cris Snooks',
'Dan Jordan',
'Dan Pavlik',
'Don Tyler',
'Jason Augustin',
'Jeff Sanders',
'Jeffrey Lamb',
'Jerry Fochtman',
'Jerry McMillan',
'John Neidert',
'Junghoo Kim',
'Ken Faulkner',
'Kevin White',
'Kyle Young',
'Lorne Torres',
'Lucy McGilley',
'Manny Fernandez',
'Matt Butler',
'Matt Hrudka',
'Michael Allen',
'Michael Childe',
'Mike Barlow',
'Mindy Hamilton',
'Naomi Housknecht',
'Nick Holmes',
'Nikki Myles',
'Paul Moore',
'Peter Grant',
'Spencer Larsen',
'Staci Maund',
'Steve Lehrer',
'Tom Trent',
'Tony Woods',
  ];
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    //console.log(this.myControl.value);
    //get RFANum from URL
    this.id = this.route.snapshot.params['id'];

    //Get Related RFA Info
    this.rfaClass.getAllRFA().subscribe(rfa=> {
      this.rfas = rfa.filter(data => data.rfanum == Number(this.id));
    })

    //Auto-Complete for Manager List
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  //Filter for Auto-Complete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  //Submit Button for Escalation Form Logic
  onSubmit({value, valid}: {value: iRFAClass, valid: boolean}){
    if(!valid){
      this.flashMessage.show('Please fill out form correctly', {
        cssClass: 'alert-danger', timeout:4000
      });
    }
    else{
      //show message 
      this.flashMessage.show('Escalation completed for'+ this.id + "!", {
        cssClass: 'alert-success', timeout:4000
      });
      //Update Escalation Boolean
      var test = 'http://10.34.9.14:3001/escalation/'+ this.id;
      console.log(test);
      this.rfaClass.escalateRFA(Number(this.id)); 
      console.log('complete');

      //Aggragate Bitwise value for Urgency based off checkbox values set
      
      //Redirect to dash
      this.router.navigate(['/escalations']);
    }
  }

  //Complete Escalation
  onSubmitComplete({value, valid}: {value: iRFAClass, valid: boolean}){
    if(!valid){
      this.flashMessage.show('Please fill out form correctly', {
        cssClass: 'alert-danger', timeout:4000
      });
    }
    else{
      //show message 
      this.flashMessage.show('Escalation completed for'+ this.id + "!", {
        cssClass: 'alert-success', timeout:4000
      });

      //Update Escalation Boolean
      var test = 'http://10.34.9.14:3001/completeescrfa/'+ this.id;
      console.log(test);
      this.rfaClass.completeEscRFA(Number(this.id)); 
      console.log('complete');
      //Redirect to dash
      this.router.navigate(['/escalations']);
    }
  }

}
