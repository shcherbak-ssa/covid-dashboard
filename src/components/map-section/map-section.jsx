/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable comma-dangle */
import React, {
  useState, useLayoutEffect, useRef, useEffect,
} from 'react';
import './map-section.scss';

import { getSearchData } from '../../tools';
import Section from '../section';
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
  FILL_MIN_ALL_COLOR,
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
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow';
am4core.useTheme(am4themesAnimated);

function getDataTitle(options) {
  return `${options.type} ${options.parameter} ${options.measurement ? ` relative ${options.measurement}` : ''}`;
}

function getDataPropName(options) {
  return `${options.type}${options.measurement}`;
}

function getDataInnerPropName(options) {
  return `${options.parameter}`;
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

export default function MapSection(props) {
  const {
    apiData, isDarkTheme, options, selectedCountry, optionMenuItems, updateOptions, setSelectedCountry,
  } = props;

  const [searchData, setSearchData] = useState(getSearchData(options));

  const sectionProps = {
    sectionType: 'map',
    headerProps: {
      title: 'Map',
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
    activeCountryObj: null,
  });

  const chart = useRef(null);

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
    // some enother variation of projection settings;
    // map.panBehavior = 'rotateLong';
    // map.projection = new am4maps.projections.Orthographic();
    // map.panBehavior = 'rotateLongLat';

    map.zoomControl = new am4maps.ZoomControl();

    map.homeZoomLevel = 1;

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
        mapElement.value = apiData[mapElement.apiInd][getDataPropName(options)][getDataInnerPropName(options)];
      }
    });

    polygonSeries.data = dataArray;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    componentContainer.current.polygonTemplate = polygonTemplate;
    polygonTemplate.tooltipText = `{name}: {value}\n${getDataTitle(options)}`;

    // Create hover state and set alternative fill color
    const hoverState = polygonTemplate.states.create('hover');
    componentContainer.current.hoverState = hoverState;
    hoverState.properties.fill = am4core.color(FILL_HOVER_COUNTRY_COLOR);
    hoverState.properties.stroke = am4core.color(STROKE_FILL_HOVER_COUNTRY_COLOR);

    // Create active state
    const activeState = polygonTemplate.states.create('active');
    componentContainer.current.activeState = activeState;
    activeState.properties.fill = am4core.color(getActiveCountryColor(options).fill);
    activeState.properties.stroke = am4core.color(getActiveCountryColor(options).stroke);

    // Remove Antarctica
    polygonSeries.exclude = ['AQ'];

    map.background.fillOpacity = 1;
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

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

    componentContainer.current.heatRulesData = {
      property: 'fill', // TODO: check next line
      target: componentContainer.current.polygonSeries.mapPolygons.template,
      min: am4core.color(getHeatRuleColor(options).min),
      max: am4core.color(getHeatRuleColor(options).max),
      // logarithmic: true  // lorarithmics does not work if the values are zero or below
    };
    polygonSeries.heatRules.push(componentContainer.current.heatRulesData);

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
    heatLegend.valueAxis.renderer.labels.template.fill = am4core.color(FONT_COLOR_LIGHT);
    // heatLegend.valueAxis.renderer.labels.template.stroke = am4core.color(FONT_COLOR_LIGHT);

    if (selectedCountry) {
      // Blank for set default country active state;
    }

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

    // Example how to bind polygon property to key in data
    // Bind 'fill' property to 'fill' key in data
    // polygonTemplate.propertyFields.fill = 'fill';

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
        componentContainer.current.polygonTemplate.tooltipText = `{name}: {value}\n${getDataTitle(options)}`;
        if (mapElement.apiInd !== null) {
          mapElement.value = apiData[mapElement.apiInd][getDataPropName(options)][getDataInnerPropName(options)];
        } else {
          mapElement.value = 'No data from API';
        }
      });
      componentContainer.current.polygonSeries.invalidateData();
      componentContainer.current.heatRulesData.max = am4core.color(getHeatRuleColor(options).max);
      componentContainer.current.heatLegend.maxColor = am4core.color(getHeatRuleColor(options).max);
      componentContainer.current.heatRulesData.min = am4core.color(getHeatRuleColor(options).min);
      componentContainer.current.heatLegend.minColor = am4core.color(getHeatRuleColor(options).min);
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
        componentContainer.current.heatLegend.valueAxis.renderer.labels.template.fill = am4core.color(FONT_COLOR_DARK);
        // componentContainer.current.heatLegend.valueAxis.renderer.labels.template.stroke = am4core.color(FONT_COLOR_DARK);
      } else {
        componentContainer.current.map.background.fill = am4core.color(MAP_BACKGROUND_COLOR_LIGHT);
        componentContainer.current.map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(OCEAN_COLOR_LIGHT);
        componentContainer.current.heatLegend.valueAxis.renderer.labels.template.fill = am4core.color(FONT_COLOR_LIGHT);
        // componentContainer.current.heatLegend.valueAxis.renderer.labels.template.stroke = am4core.color(FONT_COLOR_LIGHT);
      }
    } else {
      // componentDidMount
      updateState.current.updateTheme = true;
    }
  }, [isDarkTheme]);

  // Country change blank useEffect
  // update CountryState
  /* Not working.  Application crushing!!!! Danger!
  if (0) {
    useEffect(() => {
      if (updateState.current.updateCountry) {
        // componentDidUpdate
        if (componentContainer.current.activeCountryObj) {
          componentContainer.current.activeCountryObj.isActive = false;
          componentContainer.current.activeCountryObj = null;
        }
        if (selectedCountry) {
          const poly = componentContainer.current.polygonSeries;
          const countryIndex = poly._children._values.findIndex((el) => {
            let result;
            try {
              result = el.dataItem.dataContext.id === selectedCountry.iso2Id;
            } catch {
              result = false;
            }
            return result;
          });
          if (countryIndex >= 0) {
            componentContainer.current.activeCountryObj = poly._children._values[countryIndex];
            componentContainer.current.activeCountryObj.isActive = true;
          }
        }
      } else {
        // componentDidMount
        updateState.current.updateCountry = true;
      }
    }, [selectedCountry]);
  }
  */

  return (
    <Section {...sectionProps}>
      {<div className='map-container' id='divMapChartContainer' style={{ width: '100%', height: 'calc(100% - 32px)' }}></div>}
    </Section>
  );
}
