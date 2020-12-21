import React, {
  useEffect, useState, useLayoutEffect, useRef
} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import './chart-section.scss';

import { CHART_OPTIONS_MENU_TYPE, TOTAL_TYPE_OPTION } from '../../constants';
import Section from '../section';
import { loadTimelineForCountry } from '../../api';

export default function ChartSection(props) {
  const {
    isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry, apiData
  } = props;
  const [searchData, setSearchData] = useState({});
  const [countryData, setcountryData] = useState({});
  const [valueData, setValueData] = useState({});
  const chart = useRef(null);

  const FONT_COLOR_LIGHT = am4core.color('#ffffff');
  const FONT_COLOR_DARK = am4core.color('#393E46');
  const FONT_COLOR_RED = am4core.color('#C8244D');

  useEffect(() => {
    setSearchData(getSearchData(options));
  }, [options.parameter, options.measurement]);

  useEffect(() => {
    getDataCountry();
  }, [selectedCountry]);

  useEffect(() => {
    setValueData(getDataValue());
  }, [countryData, searchData.parameter, searchData.key]);

  async function getDataCountry() {
    if (selectedCountry) {
      const countryApiData = await loadTimelineForCountry(selectedCountry);
      if (countryApiData === null) {
        setcountryData({});
      } else setcountryData(countryApiData);
    } else { setcountryData({}); }
  }

  useLayoutEffect(() => {
    const schedule = am4core.create('chartdiv1', am4charts.XYChart);
    schedule.numberFormatter.numberFormat = '#a';
    schedule.numberFormatter.bigNumberPrefixes = [
      { number: 1e+3, suffix: 'K' },
      { number: 1e+6, suffix: 'M' },
      { number: 1e+9, suffix: 'B' }
    ];
    // Create axes
    let categoryAxis = schedule.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'data';
    categoryAxis.renderer.labels.template.fontSize = 14;

    // categoryAxis.title.text = "Countries";

    let valueAxis = schedule.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 14;

    // Create series
    let series = schedule.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'data';
    series.name = 'Sales';
    series.stroke = FONT_COLOR_RED;
    series.columns.template.tooltipText = 'Date: {categoryX}\nValue: {valueY}';
    series.columns.template.fill = FONT_COLOR_LIGHT; // fill
    chart.current = schedule;
    return () => {
      schedule.dispose();
    };
  }, []);

  useLayoutEffect(() => {
    chart.current.data = valueData;
    const xAxeslabels = chart.current._xAxes._values[0].renderer.labels.template;
    const xAxesGrid = chart.current._xAxes._values[0].renderer.grid.template;
    const yAxeslabels = chart.current._yAxes._values[0].renderer.labels.template;
    const yAxesGrid = chart.current._yAxes._values[0].renderer.grid.template;
    if (isDarkTheme) {
      console.log(123);
      xAxeslabels.fill = FONT_COLOR_LIGHT;
      yAxeslabels.fill = FONT_COLOR_LIGHT;
      yAxesGrid.stroke = FONT_COLOR_LIGHT;
      xAxesGrid.stroke = FONT_COLOR_LIGHT;
    } else {
      xAxeslabels.fill = FONT_COLOR_DARK;
      yAxeslabels.fill = FONT_COLOR_DARK;
      yAxesGrid.stroke = FONT_COLOR_DARK;
      xAxesGrid.stroke = FONT_COLOR_DARK;
    }
  }, [valueData, isDarkTheme]);

  useEffect(() => {
    setValueData(getDataValue());
  }, [countryData, searchData.parameter, searchData.key]);

  const sectionProps = {
    sectionType: 'chart',
    optionsMenuType: CHART_OPTIONS_MENU_TYPE,
    headerProps: {
      title: 'Chart',
      isDarkTheme,
      options: transformOptions(options)
    },
    updateOptions,
    optionMenuItems
  };

  function transformOptions({ parameter, measurement }) {
    return {
      type: TOTAL_TYPE_OPTION,
      parameter,
      measurement
    };
  }
  function getDataValue() {
    const newData = [];
    let obj = {};
    if (searchData.key) {
      if (countryData.Total) {
        obj = countryData[searchData.key][searchData.parameter];
      } else {
        obj = apiData.global[searchData.key][searchData.parameter];
      }
    } else {
      obj = apiData.global.Total.cases;
    }
    for (let key in obj) {
      const newDate = {};
      let correctDate = key.split('/');
      if (correctDate[0].length === 1) correctDate[0] = 0 + correctDate[0];
      if (correctDate[1].length === 1) correctDate[1] = 0 + correctDate[1];
      [correctDate[0], correctDate[1]] = [correctDate[1], correctDate[0]];

      newDate.data = correctDate.join('.') + '20';
      newDate.value = obj[key];
      newData.push(newDate);
    }
    return newData;
  }
  function getSearchData({ parameter, measurement }) {
    return {
      key: TOTAL_TYPE_OPTION + measurement,
      parameter
    };
  }

  return (
    <Section {...sectionProps}>
      <div className="chart-section-content">
        <div id="chartdiv1" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </Section>
  );
}
