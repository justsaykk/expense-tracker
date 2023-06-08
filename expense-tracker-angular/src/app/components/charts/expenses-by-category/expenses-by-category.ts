import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-expenses-by-category',
  templateUrl: './expenses-by-category.html',
  styleUrls: ['./expenses-by-category.css']
})
export class ExpensesByCategoryComponent{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A', stack: 'a' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B', stack: 'a' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  constructor() { }
}
