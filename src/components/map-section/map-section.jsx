import React, { useState, useLayoutEffect, useRef } from 'react';
import './map-section.scss';

// import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import { getSearchData } from '../../tools';
import Section from '../section';
import MapLegend from './map-legend';
import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
am4core.useTheme(am4themes_animated);
export default function MapSection(props) {
  const { apiData, isDarkTheme, options, selectedCountry, optionMenuItems, updateOptions, setSelectedCountry } = props;

  const [searchData, setSearchData] = useState(getSearchData(options));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  const sectionProps = {
    sectionType: 'map',
    headerProps: {
      title: 'Map',
      headerIcon: MapLegend({ isDarkTheme }),
      isDarkTheme,
      options,
    },
    optionMenuItems,
    updateOptions,
  };

  const chart = useRef(null);
  // const map = useRef(null);

  /*  part of the code for this component is taken from the library documentation
      https://www.amcharts.com/docs/v4/chart-types/map/
  */
  useLayoutEffect(() => {
    let map = am4core.create('divMapChartContainer', am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    // Set projection
    map.projection = new am4maps.projections.Miller();
    // map.panBehavior = 'rotateLong';
    // map.projection = new am4maps.projections.Orthographic();
    // map.panBehavior = 'rotateLongLat';

    map.zoomControl = new am4maps.ZoomControl();

    // console.log('apiData', apiData);
    // console.log('isDarkTheme', isDarkTheme);
    // console.log('options', options);
    // console.log('selectedCountry', selectedCountry);
    // console.log('optionMenuItems', optionMenuItems);
    // console.log('updateOptions', updateOptions);
    // console.log('setSelectedCountry', setSelectedCountry);

    map.homeZoomLevel = 1;
    // console.log('am4geodata_worldLow', am4geodata_worldLow);

    let ab = am4geodata_worldLow.features.map((el) => {
      return { id: el.properties.id, name: el.properties.name };
    });
    // Configure series
    // console.log(ab);

    // apiData.forEach((element, index) => {
    //   if (-1 === ab.findIndex((el) => el.id === element.iso2Id)) {
    //     console.log('not found ', element);
    //   }
    // });

    ab.forEach((el) => {
      const apiInd = apiData.findIndex((apiEl) => apiEl.iso2Id === el.id);
      const mapElement = el;
      if (apiInd === -1) {
        mapElement.apiInd = null;
      } else {
        mapElement.apiInd = apiInd;
        mapElement.totalCases = apiData[apiInd].Total.cases;
        mapElement.totalDeaths = apiData[apiInd].Total.deaths;
        mapElement.totalRecovered = apiData[apiInd].Total.recovered;
        mapElement.value = mapElement.totalCases;
      }
    });

    const polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.tooltipText = '{name} \nTotal cases: {totalCases}\nTotal death: {totalDeaths}\nTotal Recovered: {totalRecovered}';
    polygonTemplate.fill = am4core.color('#aac4e7');

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = map.colors.getIndex(0);

    // Create active state
    const activeState = polygonTemplate.states.create('active');
    activeState.properties.fill = am4core.color('#ff0000');

    // Remove Antarctica
    polygonSeries.exclude = ['AQ'];

    // Add some data
    // polygonSeries.data = [{
    //   'id': 'BY',
    //   'name': 'Belarus',
    //   'value1': '3',
    //   'value2': '%',
    //   'fill': am4core.color('#F05C5C')
    // }, {
    //   'id': 'FR',
    //   'name': 'France',
    //   'value': 50,
    //   'fill': am4core.color('#5C5CFF')
    // }];

    polygonSeries.data = ab;

    map.background.fill = am4core.color('#aadaff');
    map.background.fillOpacity = 1;

    // map background
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#aaffda');
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

    let button = map.chartContainer.createChild(am4core.Button);
    button.padding(5, 5, 5, 5);
    button.align = 'right';
    button.marginRight = 15;
    button.events.on('hit', function () {
      map.goHome();
    });
    button.icon = new am4core.Sprite();
    button.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';

    // Add heat map with logarithmic scale and legend
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#aac4e7'),
      max: am4core.color('#ED7B84'),
      logarithmic: true
    });

    // Legend options
    let heatLegend = map.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.width = am4core.percent(70);
    heatLegend.valueAxis.logarithmic = true;
    heatLegend.id = 'heatLegend';
    heatLegend.series = polygonSeries;
    heatLegend.align = 'left';
    heatLegend.valign = 'top';
    heatLegend.width = am4core.percent(85);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.background.fill = am4core.color('#000');
    heatLegend.background.fillOpacity = 0.05;
    heatLegend.padding(5, 20, 5, 20);
    heatLegend.margin(5, 20, 5, 20);
    // Set up custom heat map legend labels using axis ranges
    const minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.label.horizontalCenter = 'left';

    const maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.label.horizontalCenter = 'right';

    // Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add('text', () => {
      return '';
    });

    // Update heat legend value labels
    polygonSeries.events.on('datavalidated', (ev) => {
      const evHeatLegend = ev.target.map.getKey('heatLegend');
      const min = evHeatLegend.series.dataItem.values.value.low;
      const evMinRange = evHeatLegend.valueAxis.axisRanges.getIndex(0);
      evMinRange.value = min;
      evMinRange.label.text = '' + evHeatLegend.numberFormatter.format(min);

      const max = evHeatLegend.series.dataItem.values.value.high;
      const evMaxRange = evHeatLegend.valueAxis.axisRanges.getIndex(1);
      evMaxRange.value = max;
      evMaxRange.label.text = '' + evHeatLegend.numberFormatter.format(max);
    });


    // Bind 'fill' property to 'fill' key in data
    polygonTemplate.propertyFields.fill = 'fill';
    let imageSeries = new am4maps.MapImageSeries();
    map.series.push(imageSeries);
    let imageSeriesTemplate = imageSeries.mapImages.template;
    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color('#B27799');
    circle.stroke = am4core.color('#FFFFFF');
    circle.strokeWidth = 2;
    circle.nonScaling = true;
    circle.tooltipText = '{name}';

    // Create an event to toggle 'active' state
    polygonTemplate.events.on('hit', function (event) {
      console.log(event);
      // event.target.isActive = !event.target.isActive;
      console.log(event.target.dataItem.dataContext);
      const index = event.target.dataItem.dataContext.apiInd;
      if (index !== null) {
        setSelectedCountry(apiData[index]);
      }
    });

    polygonSeries.mapPolygons.template.events.on('over', function (ev) {
      if (!isNaN(ev.target.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
      }
      else {
        heatLegend.valueAxis.hideTooltip();
      }
    });

    polygonSeries.mapPolygons.template.events.on('out', function (ev) {
      heatLegend.valueAxis.hideTooltip();
    });

    chart.current = map;
    return () => {
      map.dispose();
    };
  }, []);
  return (
    <Section {...sectionProps}>
      {<div id='divMapChartContainer' style={{ width: '100%', height: 'calc(100% - 32px)' }}></div>}
    </Section>
  );
}
