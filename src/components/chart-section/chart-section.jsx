import React, {
  useEffect, useState, useLayoutEffect, useRef
} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import './chart-section.scss';
import {
  FONT_COLOR_LIGHT,
  FONT_COLOR_DARK,
  OCEAN_COLOR_DARK
} from './../../constants';

import Section from '../section';
import { loadTimelineForCountry } from '../../api';
import { getSearchData } from '../../tools';
import {
  getDataValue, getRuleColor
} from './chart-section-moduls';
export default function ChartSection(props) {
  const {
    isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry, apiData
  } = props;
  const [searchData, setSearchData] = useState({});
  const [countryData, setCountryData] = useState({});
  const [valueData, setValueData] = useState({});
  const [availableData, setAvailableData] = useState({});

  const chart = useRef(null);

  const FONT_SIZE_CHART_LABEL = 14;

  useEffect(() => {
    setSearchData(getSearchData(options));
  }, [options]);

  useEffect(() => {
    getDataCountry();
  }, [selectedCountry]);
  useEffect(() => {
    if (selectedCountry && !countryData) {
      setAvailableData(false);
    } else setAvailableData(true);

    setValueData(getDataValue(searchData, countryData, apiData));
  }, [countryData, searchData.parameter, searchData.key]);

  async function getDataCountry() {
    if (selectedCountry) {
      const countryApiData = await loadTimelineForCountry(selectedCountry);
      if (countryApiData === null) {
        setCountryData(false);
        setAvailableData(false);
      } else {
        setCountryData(countryApiData);
        setAvailableData(true);
      }
    } else { setCountryData({}); }
  }
  useLayoutEffect(() => {
    const schedule = am4core.create('chartdiv1', am4charts.XYChart);
    schedule.numberFormatter.numberFormat = '#a';
    schedule.numberFormatter.bigNumberPrefixes = [
      { number: 1e+3, suffix: 'K' },
      { number: 1e+6, suffix: 'M' },
      { number: 1e+9, suffix: 'B' }
    ];
    let categoryAxis = schedule.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'data';
    categoryAxis.renderer.labels.template.fontSize = FONT_SIZE_CHART_LABEL;

    let valueAxis = schedule.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = FONT_SIZE_CHART_LABEL;

    let series = schedule.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'data';
    series.name = 'Sales';
    series.columns.template.tooltipText = 'Date: {categoryX}\nValue: {valueY}';
    series.columns.template.fill = FONT_COLOR_DARK;
    chart.current = schedule;
    return () => {
      schedule.dispose();
    };
  }, []);

  useEffect(() => {
    const xAxeslabels = chart.current.xAxes.values[0].renderer.labels.template;
    const xAxesGrid = chart.current.xAxes.values[0].renderer.grid.template;
    const yAxeslabels = chart.current.yAxes.values[0].renderer.labels.template;
    const yAxesGrid = chart.current.yAxes.values[0].renderer.grid.template;
    const chartBackground = chart.current.background;
    if (!isDarkTheme) {
      xAxeslabels.fill = FONT_COLOR_LIGHT;
      yAxeslabels.fill = FONT_COLOR_LIGHT;
      yAxesGrid.stroke = FONT_COLOR_LIGHT;
      xAxesGrid.stroke = FONT_COLOR_LIGHT;
      chartBackground.fill = FONT_COLOR_DARK;
    } else {
      xAxeslabels.fill = FONT_COLOR_DARK;
      yAxeslabels.fill = FONT_COLOR_DARK;
      yAxesGrid.stroke = FONT_COLOR_DARK;
      xAxesGrid.stroke = FONT_COLOR_DARK;
      chartBackground.fill = OCEAN_COLOR_DARK;
    }
  }, [isDarkTheme]);
  useEffect(() => {
    chart.current.data = valueData;
    chart.current.series.values[0].stroke = getRuleColor(options);
  }, [valueData]);

  useEffect(() => {
    setValueData(getDataValue(searchData, countryData, apiData));
  }, [countryData, searchData]);

  const sectionProps = {
    sectionType: 'chart',
    headerProps: {
      title: 'Chart',
      isDarkTheme,
      options
    },
    updateOptions,
    optionMenuItems
  };

  function changeChart() {
    if (!availableData) {
      return (<div className='chart-section-layout'> Data is not available</div>);
    }
    return null;
  }
  const content = changeChart();
  return (
    <Section {...sectionProps}>
      <div className="chart-section-content">
        <div id="chartdiv1" style={{ width: '100%', height: '100%' }}></div>
        {content}
      </div>
    </Section>);
}
