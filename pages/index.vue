<template>
  <Page :title="'Welcome back ' + currentUserProfile?.full_name" >
  <Card>
  <VueApexCharts v-if="series && chartOptions" type="bar" height="350" :options="chartOptions" :series="series" />
  </Card>
  </Page>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts';
const currentUserProfile = await useCurrentUserProfile();
/*
const client = useSupabaseClient();
const { data, error } = await client
    .from('scans')
    .sql(`
      SELECT
        DATE_TRUNC('month', created) AS month,
        COUNT(*) AS count
      FROM
        scans
      WHERE
        severity = 'SEV_040_HIGH' AND
        created >= NOW() - INTERVAL '5 months'
      GROUP BY
        month
      ORDER BY
        month DESC;
    `);
console.log(data, error);*/
const series = ref([
  {
    name: 'PRODUCT A',
    data: [44, 55, 41, 67, 22, 43],
  },
  {
    name: 'PRODUCT B',
    data: [13, 23, 20, 8, 13, 27],
  },
  {
    name: 'PRODUCT C',
    data: [11, 17, 15, 15, 21, 14],
  },
]);
const chartOptions = ref({
  chart: {
              type: 'bar',
              height: 350,
              stacked: true,
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  total: {
                    enabled: true,
                    offsetX: 0,
                    style: {
                      fontSize: '13px',
                      fontWeight: 900
                    }
                  }
                }
              },
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            title: {
              text: 'Fiction Books Sales'
            },
            xaxis: {
              categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
              labels: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            yaxis: {
              title: {
                text: undefined
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "K"
                }
              }
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'top',
              horizontalAlign: 'left',
              offsetX: 40
            }
});
</script>
