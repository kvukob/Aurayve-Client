<script setup>
import { getCssVar } from 'quasar';
import { ref, watchEffect } from 'vue';

const props = defineProps(['chartData', 'title']);

const options = ref({
  chart: {
    type: 'candlestick',
    fontFamily: 'Inter Regular',
    background: 'transparent',
    zoom: {
      enabled: true
    },
    toolbar: {
      tools: {
        download: false
      },
      autoSelected: 'pan'
    }
  },
  title: {
    text: props.title,
    align: 'left',
    style: {
      color: getCssVar('accent')
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeFormatter: {
        hour: 'HH:mm'
      },
      style: {
        colors: '#ffffff'
      }
    }
  },
  yaxis: {
    tooltip: {
      enabled: true
    },
    labels: {
      style: {
        colors: '#ffffff'
      }
    }
  },
  tooltip: {
    custom: function({ seriesIndex, dataPointIndex, w }) {
      const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
      const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
      const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
      const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
      return (
        '<div class="apexcharts-tooltip-candlestick text-black q-pa-sm text-caption">' +
        '<div class="row justify-between">Open: <span class="value">' + o + '</span></div>' +
        '<div class="row justify-between">High: <span class="value">' + h + '</span></div>' +
        '<div class="row justify-between">Low: <span class="value">' + l + '</span></div>' +
        '<div class="row justify-between">Close: <span class="value">' + c + '</span></div>' +
        '</div>'
      );
    }
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: getCssVar('positive'),
        downward: getCssVar('negative')
      }
    }
  }
});

const series = ref([
  {
    data: props.chartData
  }
]);
watchEffect(() => {
  // Update the series data when chartData changes
  series.value[0].data = props.chartData;
});

</script>

<template>
  <apexchart type="candlestick" height="100%" :options="options" :series="series"></apexchart>
</template>

<style>
</style>
