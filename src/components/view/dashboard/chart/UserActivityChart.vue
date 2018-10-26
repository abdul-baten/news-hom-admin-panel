<template>
  <div class="is-clearfix">
    <canvas id="news-activity"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import moment from "moment";
import db from "@/plugins/firebase/init";
export default {
  data() {
    return {
      timestamps: [],
      dates: [],
      newLikesCount: [],
      newDislikesCount: [],
      newCommentsCount: []
    };
  },
  methods: {
    getChart() {
      let self = this;
      let sortable = [];
      let likesDbRef = db.collection("likes");
      let dislikesDbRef = db.collection("dislikes");
      let commentsDbRef = db.collection("comments");
      let date = new Date();
      let firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
      // Log last month's first day to the console.
      // console.log(firstDay.getDate());
      // Log last month's last day to the console.
      // console.log(lastDay.getDate());
      // Log last month's all days to the console with timestamp.
      for (var i = 1; i <= lastDay.getDate(); i++) {
        var tm = date.setDate(date.getDate() - 1, 0);
        this.timestamps.push(tm);
      }

      for (var i = 0; i < self.timestamps.length - 1; i++) {
        let start, end, ab, cd;
        ab = i;
        cd = ab + 1;
        start = self.timestamps[ab];
        end = self.timestamps[cd];
        this.dates.push(moment(self.timestamps[ab]).format("MMM DD"));
        likesDbRef
          .where("createdAt", ">", end)
          .where("createdAt", "<", start)
          .get()
          .then(querySnapShot => {
            var likesData = querySnapShot.docs.length;
            self.newLikesCount.push(likesData);
          })
          .then(() => {
            dislikesDbRef
              .where("createdAt", ">", end)
              .where("createdAt", "<", start)
              .get()
              .then(querySnapShot => {
                var dislikesData = querySnapShot.docs.length;
                self.newDislikesCount.push(dislikesData);
              });
          })
          .then(() => {
            commentsDbRef
              .where("createdAt", ">", end)
              .where("createdAt", "<", start)
              .get()
              .then(querySnapShot => {
                var commentsData = querySnapShot.docs.length;
                self.newCommentsCount.push(commentsData);
              })
              .then(() => {
                setTimeout(() => {
                  self.createChart("news-activity");
                }, 2000);
              });
          });
      }
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.dates.reverse(),
          datasets: [
            {
              label: "Likes",
              fill: false,
              data: this.newLikesCount.reverse(),
              backgroundColor: ["hsl(141, 71%, 48%)"],
              borderColor: ["hsl(141, 71%, 48%)"],
              borderWidth: 2
            },
            {
              label: "Dislikes",
              fill: false,
              data: this.newDislikesCount.reverse(),
              backgroundColor: ["hsl(171, 100%, 41%)"],
              borderColor: ["hsl(171, 100%, 41%)"],
              borderWidth: 2
            },
            {
              label: "Comments",
              fill: false,
              data: this.newCommentsCount.reverse(),
              backgroundColor: ["hsl(348, 100%, 61%)"],
              borderColor: ["hsl(348, 100%, 61%)"],
              borderWidth: 2
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
    this.getChart();
  }
};
</script>