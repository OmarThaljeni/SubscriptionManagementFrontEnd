import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.fillChartData();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Nombre des demandes', 'Nombre des services', 'Nombre des abonnements'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[]


  fillChartData() {
    this.barChartData = [
      { data: [40, 80, 70, 100], label: 'Nombre total' },
      { data: [60, 48, 40, 30], label: 'Nombre acqui' }
    ];

  }

}
