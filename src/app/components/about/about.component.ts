import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title:String;
  public subtitle:String;
  public email:String;

  constructor() {
    this.title='Daniel Rodríguez';
    this.subtitle='Software Developer';
    this.email='danielrs999@hotmail.com'
   }

  ngOnInit(): void {
  }
  sendMail(){
    window.open('mailto:danielrs999@hotmail.com','_self');
  }

}
