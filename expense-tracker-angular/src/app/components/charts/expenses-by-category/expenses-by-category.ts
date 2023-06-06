import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-expenses-by-category',
  templateUrl: './expenses-by-category.html',
  styleUrls: ['./expenses-by-category.css']
})
export class ExpensesByCategoryComponent {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }
}
