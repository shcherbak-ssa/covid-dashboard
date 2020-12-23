/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
import React, {
  useLayoutEffect, useRef, useEffect,
} from 'react';
import './map-section.scss';

import { getSearchData } from '../../tools';
import Section from '../section';

import {
  prepareDataObj,
  createMapObj,
  createMapState,
  createMapHomeButton,
  configureMapHeatLegeng,
  configureColorTheme,
  updateData,
  setAnimatedTheme,
} from './map-settings';

export default function MapSection(props) {
  const {
    apiData,
    isDarkTheme,
    options,
    selectedCountry,
    optionMenuItems,
    updateOptions,
    setSelectedCountry,
  } = props;

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

  /*  part of the code for this component is taken from the library documentation
      https://www.amcharts.com/docs/v4/chart-types/map/
  */
  useLayoutEffect(() => {
    const ccc = componentContainer.current;
    setAnimatedTheme();
    createMapObj(ccc, options);
    prepareDataObj(ccc, apiData, options);
    createMapState(ccc, options);
    createMapHomeButton(ccc);

    configureMapHeatLegeng(ccc, options);
    configureColorTheme(ccc, isDarkTheme);

    ccc.polygonSeries.events.on('datavalidated', (ev) => {
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

    // Create an event to toggle 'active' state
    ccc.polygonTemplate.events.on('hit', (event) => {
      const index = event.target.dataItem.dataContext.apiInd;
      if (index !== null) {
        setSelectedCountry([index]);
      }
    });

    ccc.polygonSeries.mapPolygons.template.events.on('over', (ev) => {
      if (!Number.isNaN(ev.target.dataItem.value)) {
        ccc.heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value);
      } else {
        ccc.heatLegend.valueAxis.hideTooltip();
      }
    });

    ccc.polygonSeries.mapPolygons.template.events.on('out', () => {
      ccc.heatLegend.valueAxis.hideTooltip();
    });

    return () => {
      ccc.map.dispose();
    };
  }, []);

  // update map data
  useEffect(() => {
    if (updateState.current.updateData) {
      // componentDidUpdate
      const ccc = componentContainer.current;
      updateData(ccc, apiData, options);
    } else {
      // componentDidMount
      updateState.current.updateData = true;
    }
  }, [options]);

  // update map isDarkTheme
  useEffect(() => {
    if (updateState.current.updateTheme) {
      // componentDidUpdate
      const ccc = componentContainer.current;
      configureColorTheme(ccc, isDarkTheme);
    } else {
      // componentDidMount
      updateState.current.updateTheme = true;
    }
  }, [isDarkTheme]);

  return (
    <Section {...sectionProps}>
      {<div className='map-container' id='divMapChartContainer' style={{ width: '100%', height: 'calc(100% - 32px)' }}></div>}
    </Section>
  );
}
