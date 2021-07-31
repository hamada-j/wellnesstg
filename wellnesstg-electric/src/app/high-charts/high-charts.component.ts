import { Component, OnInit } from '@angular/core';

import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
require("highcharts/highcharts-more")(Highcharts);
import { ApiService } from '../api.service';

@Component({
  selector: 'app-high-charts',
  templateUrl: './high-charts.component.html',
  styleUrls: ['./high-charts.component.scss']
})
export class HighChartsComponent implements OnInit {
  breakpoint: any;
  arrayResult: any = [];

  Highcharts1 = Highcharts;
  Highcharts2 = Highcharts;
  Highcharts3 = Highcharts;
  Highcharts4 = Highcharts;

  chartOptions1: Highcharts.Options = {};
  chartOptions2: Highcharts.Options = {};
  chartOptions3: Highcharts.Options = {};
  chartOptions4: Highcharts.Options = {};

  chart: any;
  updateFromInput = false;
  chartConstructor = "chart";
  chartCallback: any;

  data = []

  constructor(private serviceApi: ApiService) { }

  async ngOnInit(){

    await this.serviceApi.getAll().then((res) => {
      //console.log('---> ', res);
      this.arrayResult = res;

      // Property's
      let nameClients = [];
      let seriesData: any = [
        {name: 'Power', data: []},
        {name: 'Consumption', data: []},
        {name: 'Difference', data: []}];
      for(let i = 0; i < this.arrayResult.length; i++){
          nameClients.push(this.arrayResult[i].name);
          seriesData[0].data.push(this.arrayResult[i].power);
          seriesData[1].data.push(this.arrayResult[i].consumption);
          seriesData[2].data.push(this.arrayResult[i].difference);
      }

      // Bonus True/False
      let trueBonusesAmount = this.arrayResult.filter((doc: any) => {
        return doc.bonus === true});
      let falseBonusesAmount = this.arrayResult.filter((doc: any) => { return doc.bonus === false});

      // By City
      let amountMadrid = this.getCity(this.arrayResult, "Madrid");

        let amountBarcelona = this.arrayResult.filter((doc: any) => {
        return doc.city === "Barcelona"});
        let amountSeville = this.arrayResult.filter((doc: any) => {
        return doc.city === "Sevilla"});

      // Power/consumption
      let powerSum = this.getSum(this.arrayResult, 'power');
      let consumptionSum = this.getSum(this.arrayResult, 'consumption');




      this.chartOptions1 = {
        chart: {
          type: "column",
        },
        xAxis: {
        categories: nameClients
        },
        colors: ["#2f7ed8", "#0d233a", "#a6c96a"],
        title: {
          text: "Activity",
        },
        subtitle: {
          text: "all clients",
        },
        tooltip: {
          shared: true,
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: true,
        },
        series: seriesData
      };

      this.chartOptions2 = {


            chart: {
            plotShadow: false,
            type: 'pie'
        },
        title: {
          text: 'Bonus for extra consumption'
        },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
         accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        credits: {
          enabled: false,
        },

         plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
          name: 'Clients Bonus',
          colorByPoint: true,
          type: "pie",
          data: [{
            name: 'Clients with Bonus',
            y: trueBonusesAmount.length,
            sliced: true,
            selected: true
        },
        {
            name: 'Clients without',
            y: falseBonusesAmount.length,
        },

      ]
        }]

      };

      this.chartOptions3 = {

        chart: {
            type: 'packedbubble',
            //height: '100%'
        },
        title: {
            text: 'By City'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '100%',
                //zMin: 0,
                //zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: undefined,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    parentNodeFormat: '{series.name}',
                    format: '{point.name}',
                    // filter: {
                    //     property: 'y',
                    //     operator: '>',
                    //     value: 200
                    // },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: [{
          name: 'Spain',
          type: 'packedbubble',
            data: [{
                name: 'Madrid',
                value: amountMadrid.length,
            }, {
                name: 'Barcelona',
                value: amountBarcelona.length,
            },
            {
                name: "Seville",
                value: amountSeville.length,
            }]
            }]
          }

      this.chartOptions4 = {

        chart: {
              type: 'gauge',
              alignTicks: false,
              //plotBackgroundColor: null,
              //plotBackgroundImage: null,
              plotBorderWidth: 0,
              plotShadow: false
          },
          title: {
              text: 'Total Power/Consumption kW/10'
          },
          credits: {
            enabled: false,
          },
          pane: {
              startAngle: -150,
              endAngle: 150
          },
          yAxis: [{
              min: 0,
              max: 500,
              lineColor: '#339',
              tickColor: '#339',
              minorTickColor: '#339',
              offset: -25,
              lineWidth: 2,
              labels: {
                  distance: -20,
                  rotation: undefined,
              },
              tickLength: 5,
              minorTickLength: 5,
              endOnTick: false
          }, {
              min: 0,
              max: 500,
              tickPosition: 'outside',
              lineColor: '#933',
              lineWidth: 2,
              minorTickPosition: 'outside',
              tickColor: '#933',
              minorTickColor: '#933',
              tickLength: 5,
              minorTickLength: 5,
              labels: {
                  distance: 12,
                  rotation: undefined
              },
              offset: -20,
              endOnTick: false
          }],

          series: [{
              name: 'Power/Consumption',
              type: 'gauge',
              data: [powerSum],
              dataLabels: {
                  formatter: function () {
                      let power: any = this.y,
                          consumption = consumptionSum;
                      return '<span style="color:#339">' + power + ' kW Power</span><br/>' +
                          '<span style="color:#933">' + consumption + ' kW Consumption</span>';
                  },
                  backgroundColor: {
                      linearGradient: {
                          x1: 0,
                          y1: 0,
                          x2: 0,
                          y2: 1
                      },
                      stops: [
                          [0, '#DDD'],
                          [1, '#FFF']
                      ]
                  }
              },
              tooltip: {
                  valueSuffix: ' kW'
              }
          }]

      }



    }).catch(err => { console.log(err); });

     HC_exporting(Highcharts);

      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 300);

      this.serviceApi.action$.subscribe(async (getRefresh) => { this.ngOnInit() })
      //this.breakpoint = (window.innerWidth < 600) ? 2 : 1;
  }



  getCity(array: any, city: string) {
    return array.filter((doc: any) => {
        return doc.city === city});
  }

  getSum (array: any, column: any) {
    let values = array.map((item: any) => parseInt(item[column]) || 0)
    return values.reduce((a: any, b: any) => a + b)
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth > 600) ? 2 : 1;
  }

}
