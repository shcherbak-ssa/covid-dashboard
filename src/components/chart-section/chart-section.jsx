import React, {
  useEffect, useState, useLayoutEffect, useRef
} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import './chart-section.scss';

import Section from '../section';
import { loadTimelineForCountry } from '../../api';
import { getSearchData } from '../../tools';

export default function ChartSection(props) {
  const {
    isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry, apiData
  } = props;
  const [searchData, setSearchData] = useState({});
  const [countryData, setcountryData] = useState({});
  const [valueData, setValueData] = useState({});
  const chart = useRef(null);
  console.log(options);
  console.log(apiData);
  console.log(searchData);
  const FONT_COLOR_LIGHT = am4core.color('#ffffff');
  const FONT_COLOR_DARK = am4core.color('#393E46');
  const FONT_COLOR_RED = am4core.color('#C8244D');

  useEffect(() => {
    setSearchData(getSearchData(options));
  }, [options]);

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
    const xAxeslabels = chart.current._xAxes._values[0].renderer.labels.template;
    const xAxesGrid = chart.current._xAxes._values[0].renderer.grid.template;
    const yAxeslabels = chart.current._yAxes._values[0].renderer.labels.template;
    const yAxesGrid = chart.current._yAxes._values[0].renderer.grid.template;
    if (isDarkTheme) {
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
  }, [isDarkTheme]);
  useLayoutEffect(() => {
    chart.current.data = valueData;
  }, [valueData]);
  useEffect(() => {
    setValueData(getDataValue());
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

  function getDataValue() {
    const newData = [];
    let obj = {};
    let startValue = 0;

    if (searchData.key) {
      if (countryData.Total) {
        if (searchData.key === 'Last day') {
          obj = countryData.Total[searchData.parameter];
        } else if (searchData.key === 'Last day100k') {
          obj = countryData.Total100k[searchData.parameter];
        } else {
          obj = countryData[searchData.key][searchData.parameter];
        }
      } else if (searchData.key === 'Last day') {
        obj = apiData.global.Total[searchData.parameter];
      } else if (searchData.key === 'Last day100k') {
        obj = apiData.global.Total100k[searchData.parameter];
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
      if (searchData.key === 'Last day' || searchData.key === 'Last day100k') {
        newDate.value = obj[key] - startValue < 0 ? 0 : obj[key] - startValue;
        startValue = obj[key];
      } else {
        newDate.value = obj[key];
      }
      newData.push(newDate);
    }
    return newData;
  }

  return (
    <Section {...sectionProps}>
      <div className="chart-section-content">
        <div id="chartdiv1" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </Section>
  );
}
