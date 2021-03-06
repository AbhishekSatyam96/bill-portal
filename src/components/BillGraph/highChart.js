export const config = {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Monthly Bill Cycle'
  },
  subtitle: {
      text: ''
  },
  accessibility: {
      announceNewData: {
          enabled: true
      }
  },
  xAxis: {
      type: 'category'
  },
  yAxis: {
      title: {
          text: 'Bill Amount'
      }

  },
  legend: {
      enabled: false
  },
  plotOptions: {
      series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
              format: '{point.y}'
          }
      }
  },

  tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> Rs<br/>'
  },

  series: [
      {
          name: "Monthly Bill Cycle",
          colorByPoint: true,
          data: []
      }
  ]
}