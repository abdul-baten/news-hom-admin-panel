<template>
    <div class="is-clearfix">
        <canvas id="user-activity"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";
import db from "@/plugins/firebase/init";
export default {
  data() {
    return {
      country: [],
      countryResult: [],
      countryNames: [],
      newsCnt: []
    };
  },
  mounted() {},
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.countryNames.reverse(),
          datasets: [
            {
              label: "Country",
              data: this.newsCnt.reverse(),
              backgroundColor: [
                "rgba(54,73,93,.5)", // Blue
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)"
              ],
              borderColor: [
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          }
        }
      });
    }
  },
  created() {
    var self = this;
    var sortable = [];
    var dbRef = db.collection("news");
    dbRef
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(result => {
          var data = result.data().country;
          self.country.push(data);
        });
      })
      .then(() => {
        var count = {};
        self.country.forEach(item => {
          if (!count.hasOwnProperty(item)) {
            count[item] = 1;
          } else {
            count[item] += 1;
          }
        });
        self.countryResult.push({
          countryName: count
        });
        for (let countryData in self.countryResult[0].countryName) {
          sortable.push([
            countryData,
            self.countryResult[0].countryName[countryData]
          ]);
        }
        sortable.sort(function(a, b) {
          return b[1] - a[1];
        });
        for (let i = 0; i < 2; ++i) {
          self.countryNames.push(sortable[i][0]);
          self.newsCnt.push(sortable[i][1]);
        }
        self.createChart("user-activity");
      });
  }
};
</script>

