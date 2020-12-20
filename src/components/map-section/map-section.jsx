/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import './map-section.scss';

// import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import { getSearchData } from '../../tools';
import Section from '../section';
import MapLegend from './map-legend';
import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
am4core.useTheme(am4themesAnimated);

const MAP_BACKGROUND_COLOR_LIGHT = '#aadaff';
const MAP_BACKGROUND_COLOR_DARK = '#393e46';
const OCEAN_COLOR_LIGHT = '#aaeaff';
const OCEAN_COLOR_DARK = '#4c5564';
const FONT_COLOR_LIGHT = '#393E46';
const FONT_COLOR_DARK = '#FFFFFF';

function getDataTitle(options) {
  return `${options.type} ${options.parameter} ${options.measurement ? ` relative ${options.measurement}` : ''}`;
}

function getDataPropName(options) {
  return `${options.type}${options.measurement}`;
}

function getDataInnerPropName(options) {
  return `${options.parameter}`;
}

export default function MapSection(props) {
  const { apiData, isDarkTheme, options, selectedCountry, optionMenuItems, updateOptions, setSelectedCountry } = props;

  const [searchData, setSearchData] = useState(getSearchData(options));

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

  const updateState = useRef({
    updateData: false,
    updateTheme: false,
    updateCountry: false,
  });

  const componentContainer = useRef({
    map: null,
    polygonSeries: null,
    polygonTemplate: null,
    dataArray: null,
    activeState: null,
    hoverState: null,
    button: null,
    heatLegend: null,
    heatLegendMinRange: null,
    heatLegendMaxRange: null,
  });

  const chart = useRef(null);
  // const map = useRef(null);

  /*  part of the code for this component is taken from the library documentation
      https://www.amcharts.com/docs/v4/chart-types/map/
  */
  useLayoutEffect(() => {
    const map = am4core.create('divMapChartContainer', am4maps.MapChart);
    componentContainer.current.map = map;
    map.geodata = am4geodataWorldLow;
    const polygonSeries = new am4maps.MapPolygonSeries();
    componentContainer.current.polygonSeries = polygonSeries;
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
    // console.log('am4geodataWorldLow', am4geodataWorldLow);

    const dataArray = am4geodataWorldLow.features.map((el) => {
      return { id: el.properties.id, name: el.properties.name };
    });
    componentContainer.current.dataArray = dataArray;

    dataArray.forEach((el) => {
      const apiInd = apiData.findIndex((apiEl) => apiEl.iso2Id === el.id);
      const mapElement = el;
      if (apiInd === -1) {
        mapElement.apiInd = null;
        mapElement.value = 'No data from API';
      } else {
        mapElement.apiInd = apiInd;
        // mapElement.value = apiData[apiInd].Total.cases;
        mapElement.value = apiData[mapElement.apiInd][getDataPropName(options)][getDataInnerPropName(options)];
        // mapElement.title = 'title';
      }
      mapElement.title = getDataTitle(options);
    });

    // ab.forEach((el, index) => {
    //   el.value = (index - 100);
    //   el.title = 'food';
    // });
    // ab.data = [{
    //   'id': 'US',
    //   'name': 'Unated States',
    //   'value': '53',
    //   'title': 'Total food',
    // }, {
    //   'id': 'FR',
    //   'name': 'France',
    //   'value': 12,
    //   'title': 'Total food',
    // }];
    polygonSeries.data = dataArray;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    componentContainer.current.polygonTemplate = polygonTemplate;
    polygonTemplate.tooltipText = '{name}: {value}\n{title}';
    // polygonTemplate.fill = am4core.color('#aac4e7');

    // Create hover state and set alternative fill color
    const hoverState = polygonTemplate.states.create('hover');
    componentContainer.current.hoverState = hoverState;
    hoverState.properties.fill = map.colors.getIndex(0);

    // Create active state
    const activeState = polygonTemplate.states.create('active');
    componentContainer.current.activeState = activeState;
    activeState.properties.fill = am4core.color('#ff0000');

    // Remove Antarctica
    polygonSeries.exclude = ['AQ'];

    map.background.fillOpacity = 1;
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

    // map background aadaff aaffda aaeaff   //dark theme   393e46
    if (isDarkTheme) {
      map.background.fill = am4core.color(MAP_BACKGROUND_COLOR_DARK);
      map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(OCEAN_COLOR_DARK);
    } else {
      map.background.fill = am4core.color(MAP_BACKGROUND_COLOR_LIGHT);
      map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(OCEAN_COLOR_LIGHT);
    }

    const button = map.chartContainer.createChild(am4core.Button);
    componentContainer.current.button = button;
    button.padding(5, 5, 5, 5);
    button.align = 'right';
    button.marginRight = 15;
    button.events.on('hit', () => {
      map.goHome();
    });
    button.icon = new am4core.Sprite();
    button.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';

    /* non logarithmic example

    // Create a heat rule
    polygonSeries.heatRules.push({
      "target": polygonSeries.mapPolygons.template,
      "property": "fill",
      "min": am4core.color("#F5DBCB"),
      "max": am4core.color("#ED7B84"),
      // logarithmic: true
    });

    // Create a heat legend;
    const heatLegend = map.createChild(am4maps.HeatLegend);
    heatLegend.series = polygonSeries;
    heatLegend.width = am4core.percent(70);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
    heatLegend.valueAxis.renderer.minGridDistance = 30;

    // Set up heat legend tooltips;
    polygonSeries.mapPolygons.template.events.on("over", function (ev) {
      if (!isNaN(ev.target.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
      }
      else {
        heatLegend.valueAxis.hideTooltip();
      }
    });

    polygonSeries.mapPolygons.template.events.on("out", function (ev) {
      heatLegend.valueAxis.hideTooltip();
    });

    */

    // Add heat map with logarithmic scale and legend
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#aac4e7'),
      max: am4core.color('#ED7B84'),
      // logarithmic: true
    });

    // Legend options
    const heatLegend = map.createChild(am4maps.HeatLegend);
    componentContainer.current.heatLegend = heatLegend;

    heatLegend.width = am4core.percent(70);
    // heatLegend.valueAxis.logarithmic = true;
    heatLegend.id = 'heatLegend';
    heatLegend.series = polygonSeries;
    heatLegend.align = 'left';
    heatLegend.valign = 'top';
    heatLegend.width = am4core.percent(85);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.background.fill = am4core.color('#FFF');
    heatLegend.background.fillOpacity = 0.35;
    heatLegend.padding(5, 20, 5, 20);
    heatLegend.margin(5, 20, 5, 20);
    // Set up custom heat map legend labels using axis ranges
    const hlMinRange = heatLegend.valueAxis.axisRanges.create();
    hlMinRange.label.horizontalCenter = 'left';
    const hlMaxRange = heatLegend.valueAxis.axisRanges.create();
    hlMaxRange.label.horizontalCenter = 'right';
    componentContainer.current.heatLegendMinRange = hlMinRange;
    componentContainer.current.heatLegendMaxRange = hlMaxRange;

    // Blank out internal heat legend value axis labels
    heatLegend.valueAxis.renderer.labels.template.adapter.add('text', () => {
      return '';
    });

    // heatLegend.fill = am4core.color('#0F0');
    // console.log(heatLegend.labels.template);
    // heatLegend.valueAxis.renderer.labels.template.propertyFields.fill = am4core.color('#0F0');
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
    // polygonTemplate.propertyFields.fill = 'fill';

    // let imageSeries = new am4maps.MapImageSeries();
    // map.series.push(imageSeries);
    // let imageSeriesTemplate = imageSeries.mapImages.template;
    // let circle = imageSeriesTemplate.createChild(am4core.Circle);
    // circle.radius = 4;
    // circle.fill = am4core.color('#B27799');
    // circle.stroke = am4core.color('#FFFFFF');
    // circle.strokeWidth = 2;
    // circle.nonScaling = true;
    // circle.tooltipText = '{name}';

    // Create an event to toggle 'active' state
    polygonTemplate.events.on('hit', (event) => {
      const index = event.target.dataItem.dataContext.apiInd;
      if (index !== null) {
        setSelectedCountry(apiData[index]);
      }
    });

    polygonSeries.mapPolygons.template.events.on('over', (ev) => {
      if (!Number.isNaN(ev.target.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    });

    polygonSeries.mapPolygons.template.events.on('out', () => {
      heatLegend.valueAxis.hideTooltip();
    });

    chart.current = map;
    return () => {
      map.dispose();
    };
  }, []);

  // update map data
  useEffect(() => {
    if (updateState.current.updateData) {
      // componentDidUpdate
      componentContainer.current.dataArray.forEach((e) => {
        const mapElement = e;
        mapElement.title = getDataTitle(options);
        if (mapElement.apiInd !== null) {
          mapElement.value = apiData[mapElement.apiInd][getDataPropName(options)][getDataInnerPropName(options)];
        } else {
          mapElement.value = 'No data from API';
        }
      });
      componentContainer.current.polygonSeries.invalidateData();
    } else {
      // componentDidMount
      updateState.current.updateData = true;
    }
  }, [options]);

  // update map isDarkTheme
  useEffect(() => {
    if (updateState.current.updateTheme) {
      // componentDidUpdate
      if (isDarkTheme) {
        componentContainer.current.map.background.fill = am4core.color(MAP_BACKGROUND_COLOR_DARK);
        componentContainer.current.map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(OCEAN_COLOR_DARK);
      } else {
        componentContainer.current.map.background.fill = am4core.color(MAP_BACKGROUND_COLOR_LIGHT);
        componentContainer.current.map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(OCEAN_COLOR_LIGHT);
      }
    } else {
      // componentDidMount
      updateState.current.updateTheme = true;
    }
  }, [isDarkTheme]);

  return (
    <Section {...sectionProps}>
      {<div id='divMapChartContainer' style={{ width: '100%', height: 'calc(100% - 32px)' }}></div>}
    </Section>
  );
}
