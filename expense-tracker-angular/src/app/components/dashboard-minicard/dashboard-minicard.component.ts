import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-minicard',
  templateUrl: './dashboard-minicard.component.html',
  styleUrls: ['./dashboard-minicard.component.css']
})
export class DashboardMinicardComponent implements OnInit{
  isInitializing!: boolean;
  @Input() icon: string = 'paid'
  @Input() iconColor: string = 'basic'
  @Input() value: number = 10
  @Input() title: string = 'Loading...'
  @Input() sign: string = '+'
  @Input() analysisColor: string = 'red'
  @Input() signValue: number = 0.125;

  ngOnInit(): void {  
      this.isInitializing = true;
      setTimeout(() => {
        this.isInitializing = false;
      }, 5000);
  }
  
 }
