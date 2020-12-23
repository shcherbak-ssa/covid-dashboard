/* eslint-disable comma-dangle */
import {
  MAP_BACKGROUND_COLOR_LIGHT,
  MAP_BACKGROUND_COLOR_DARK,
  OCEAN_COLOR_LIGHT,
  OCEAN_COLOR_DARK,
  FONT_COLOR_LIGHT,
  FONT_COLOR_DARK,
  FILL_MAX_CASES_COLOR,
  FILL_MAX_DEATH_COLOR,
  FILL_MAX_RECOVERED_COLOR,
  FILL_MIN_CASES_COLOR,
  FILL_MIN_DEATH_COLOR,
  FILL_MIN_RECOVERED_COLOR,
  FILL_ACTIVE_COUNTRY_CASES_COLOR,
  FILL_ACTIVE_COUNTRY_DEATH_COLOR,
  FILL_ACTIVE_COUNTRY_RECOVERED_COLOR,
  STROKE_ACTIVE_COUNTRY_CASES_COLOR,
  STROKE_ACTIVE_COUNTRY_DEATH_COLOR,
  STROKE_ACTIVE_COUNTRY_RECOVERED_COLOR,
  FILL_HOVER_COUNTRY_COLOR,
  STROKE_FILL_HOVER_COUNTRY_COLOR,
} from './../../constants';
import { getSearchData } from '../../tools';
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';

function setAnimatedTheme() {
  am4core.useTheme(am4themesAnimated);
}
function getDataTitle(options) {
  return `${options.type} ${options.parameter} ${options.measurement ? ` relative ${options.measurement}` : ''}`;
}

function getHeatRuleColor(options) {
  if (options.parameter === 'deaths') {
    return {
      min: FILL_MIN_DEATH_COLOR,
      max: FILL_MAX_DEATH_COLOR,
    };
  }
  if (options.parameter === 'cases') {
    return {
      min: FILL_MIN_CASES_COLOR,
      max: FILL_MAX_CASES_COLOR,
    };
  }
  return {
    min: FILL_MIN_RECOVERED_COLOR,
    max: FILL_MAX_RECOVERED_COLOR,
  };
}

function getActiveCountryColor(options) {
  if (options.parameter === 'deaths') {
    return {
      fill: FILL_ACTIVE_COUNTRY_DEATH_COLOR,
      stroke: STROKE_ACTIVE_COUNTRY_DEATH_COLOR,
    };
  }
  if (options.parameter === 'cases') {
    return {
      fill: FILL_ACTIVE_COUNTRY_CASES_COLOR,
      stroke: STROKE_ACTIVE_COUNTRY_CASES_COLOR,
    };
  }
  return {
    fill: FILL_ACTIVE_COUNTRY_RECOVERED_COLOR,
    stroke: STROKE_ACTIVE_COUNTRY_RECOVERED_COLOR,
  };
}

function createMapObj(container, options) {
  const ccc = container;
  ccc.map = am4core.create('divMapChartContainer', am4maps.MapChart);
  ccc.map.geodata = am4geodataWorldLow;
  ccc.polygonSeries = new am4maps.MapPolygonSeries();
  ccc.polygonSeries.useGeodata = true;
  ccc.map.series.push(ccc.polygonSeries);
  // Remove Antarctica
  ccc.polygonSeries.exclude = ['AQ'];

  // Set projection
  ccc.map.projection = new am4maps.projections.Miller();
  // some enother variation of projection settings;
  // map.panBehavior = 'rotateLong';
  // map.projection = new am4maps.projections.Orthographic();
  // map.panBehavior = 'rotateLongLat';
  ccc.map.zoomControl = new am4maps.ZoomControl();
  ccc.map.homeZoomLevel = 1;
  ccc.map.background.fillOpacity = 1;
  ccc.map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
  ccc.polygonTemplate = ccc.polygonSeries.mapPolygons.template;
  ccc.polygonTemplate.tooltipText = `{name}: {value}\n${getDataTitle(options)}`;
}

function prepareDataObj(container, apiData, options) {
  const ccc = container;
  ccc.dataArray = ccc.map.geodata.features.map((el) => {
    return { id: el.properties.id, name: el.properties.name };
  });
  ccc.dataArray.forEach((el) => {
    const apiInd = apiData.findIndex((apiEl) => apiEl.iso2Id === el.id);
    const mapElement = el;
    if (apiInd === -1) {
      mapElement.apiInd = null;
      mapElement.value = 'No data from API';
    } else {
      mapElement.apiInd = apiInd;
      const data = getSearchData(options);
      mapElement.value = apiData[mapElement.apiInd][data.key][data.parameter];
    }
  });
  ccc.polygonSeries.data = ccc.dataArray;
}

function createMapState(container, options) {
  const ccc = container;
  // Create hover state and set alternative fill color
  ccc.hoverState = ccc.polygonTemplate.states.create('hover');
  ccc.hoverState.properties.fill = am4core.color(FILL_HOVER_COUNTRY_COLOR);
  ccc.hoverState.properties.stroke = am4core.color(STROKE_FILL_HOVER_COUNTRY_COLOR);
  // Create active state
  ccc.activeState = ccc.polygonTemplate.states.create('active');
  ccc.activeState.properties.fill = am4core.color(getActiveCountryColor(options).fill);
  ccc.activeState.properties.stroke = am4core.color(getActiveCountryColor(options).stroke);
}

function createMapHomeButton(container) {
  const ccc = container;
  ccc.button = ccc.map.chartContainer.createChild(am4core.Button);
  ccc.button.padding(5, 5, 5, 5);
  ccc.button.align = 'right';
  ccc.button.marginRight = 15;
  ccc.button.events.on('hit', () => {
    ccc.map.goHome();
  });
  ccc.button.icon = new am4core.Sprite();
  ccc.button.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
}

function configureMapHeatLegeng(container, options) {
  const ccc = container;
  ccc.heatRulesData = {
    property: 'fill',
    target: ccc.polygonSeries.mapPolygons.template,
    min: am4core.color(getHeatRuleColor(options).min),
    max: am4core.color(getHeatRuleColor(options).max),
    // logarithmic: true  // lorarithmics does not work if the values are zero or below
  };
  ccc.polygonSeries.heatRules.push(ccc.heatRulesData);
  // Legend options
  ccc.heatLegend = ccc.map.createChild(am4maps.HeatLegend);
  // heatLegend.valueAxis.logarithmic = true;
  // lorarithmics does not work if the values are zero or below
  ccc.heatLegend.id = 'heatLegend';
  ccc.heatLegend.series = ccc.polygonSeries;
  ccc.heatLegend.align = 'center';
  ccc.heatLegend.valign = 'top';
  ccc.heatLegend.width = am4core.percent(80);
  ccc.heatLegend.marginRight = am4core.percent(4);
  ccc.heatLegend.background.fill = am4core.color('#FFF');
  ccc.heatLegend.background.fillOpacity = 0.35;
  ccc.heatLegend.padding(5, 20, 5, 20);
  ccc.heatLegend.margin(5, 20, 5, 20);
  // Set up custom heat map legend labels using axis ranges
  ccc.heatLegendMinRange = ccc.heatLegend.valueAxis.axisRanges.create();
  ccc.heatLegendMinRange.label.horizontalCenter = 'left';
  ccc.heatLegendMaxRange = ccc.heatLegend.valueAxis.axisRanges.create();
  ccc.heatLegendMaxRange.label.horizontalCenter = 'right';

  // Blank out internal heat legend value axis labels
  ccc.heatLegend.valueAxis.renderer.labels.template.adapter.add('text', () => {
    return '';
  });
}

function configureColorTheme(container, isDarkTheme) {
  const ccc = container;
  if (isDarkTheme) {
    ccc.map.background.fill = am4core.color(MAP_BACKGROUND_COLOR_DARK);
    ccc.map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(OCEAN_COLOR_DARK);
    ccc.heatLegend.valueAxis.renderer.labels.template.fill = am4core.color(FONT_COLOR_DARK);
    // ccc.heatLegend.valueAxis.renderer.labels.template.stroke = am4core.color(FONT_COLOR_DARK);
  } else {
    ccc.map.background.fill = am4core.color(MAP_BACKGROUND_COLOR_LIGHT);
    ccc.map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(OCEAN_COLOR_LIGHT);
    ccc.heatLegend.valueAxis.renderer.labels.template.fill = am4core.color(FONT_COLOR_LIGHT);
    // ccc.heatLegend.valueAxis.renderer.labels.template.stroke = am4core.color(FONT_COLOR_LIGHT);
  }
}

function updateData(container, apiData, options) {
  const ccc = container;
  ccc.polygonTemplate.tooltipText = `{name}: {value}\n${getDataTitle(options)}`;
  ccc.dataArray.forEach((e) => {
    const mapElement = e;
    if (mapElement.apiInd !== null) {
      const data = getSearchData(options);
      mapElement.value = apiData[mapElement.apiInd][data.key][data.parameter];
    } else {
      mapElement.value = 'No data from API';
    }
  });
  ccc.heatRulesData.max = am4core.color(getHeatRuleColor(options).max);
  ccc.heatLegend.maxColor = am4core.color(getHeatRuleColor(options).max);
  ccc.heatRulesData.min = am4core.color(getHeatRuleColor(options).min);
  ccc.heatLegend.minColor = am4core.color(getHeatRuleColor(options).min);
  ccc.polygonSeries.invalidateData();
}

export {
  setAnimatedTheme,
  getDataTitle,
  getHeatRuleColor,
  getActiveCountryColor,
  prepareDataObj,
  createMapObj,
  createMapState,
  createMapHomeButton,
  configureMapHeatLegeng,
  configureColorTheme,
  updateData,
};
