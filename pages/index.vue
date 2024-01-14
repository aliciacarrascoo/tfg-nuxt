<template>
  <Page :title="'Welcome back ' + currentUserProfile?.full_name" >
  <Card>
    <VueApexCharts v-if="series && chartOptions" type="bar" height="350" :options="chartOptions" :series="series" />
  </Card>

  </Page>
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts';
const client = useSupabaseClient();
const currentUserProfile = await useCurrentUserProfile();

// -- Start: Horizontal severity chart
const nBars = 5; 
const dateRanges = getLastMonths(nBars);
const dataPerRange = [];

for(let i = 0; i < dateRanges.length- 1; i++) {

const { data, error } = await client
    .from("scans")
    .select()
    .not('severity', 'is', null)
    .gte('created', dateRanges[i])
    .lte('created', dateRanges[i + 1]);
  dataPerRange.push(data);
}
const severities = ['SEV_010_INFORMATIONAL', 'SEV_020_LOW' ,  'SEV_030_MEDIUM',  'SEV_040_HIGH', 'SEV_050_CRITICAL' ];
const series = ref(severities.map((severity) => {
 return {
  name: severity.split("_").pop().toLowerCase(), 
  data:  dataPerRange.map((range) => {
          return range.filter((scan) => scan.severity === severity).length;
  })};
}));
const chartOptions = ref({
  chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%'
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            stroke: {
              width: 1,
              colors: ['#fff']
            },
            title: {
              text: 'Percentage of severities per month'
            },
            xaxis: {
              categories: dateRanges.slice(0, -1).map((range) => new Date(range).getUTCMonth() + 1 + "-" + new Date(range).getUTCFullYear()),
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " Scans"
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
// -- End: Horizontal severity chart
</script>
