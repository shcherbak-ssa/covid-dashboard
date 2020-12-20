import React, { useEffect, useState, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import './chart-section.scss';

import { CHART_OPTIONS_MENU_TYPE, TOTAL_TYPE_OPTION } from '../../constants';
import Section from '../section';
import { loadTimelineForCountry } from '../../api';

export default function ChartSection(props) {
  const {
    isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry
  } = props;
  const [searchData, setSearchData] = useState({});
  const [apiData] = useState(props.apiData);
  const [countryData, setcountryData] = useState({});

  useEffect(() => {
    setSearchData(getSearchData(options));
  }, [options]);

  useEffect(() => {
    getDataCountry();
  }, [selectedCountry]);

  async function getDataCountry() {
    if (selectedCountry) {
      const countryApiData = await loadTimelineForCountry(selectedCountry);
      if (countryApiData === null) {
        setcountryData({})
      }
      else setcountryData(countryApiData);
    } else { setcountryData({}) }
  }

  useEffect(() => {
    const chart = am4core.create('chartdiv1', am4charts.XYChart);
    const newData = [];
    let obj = {};
    if (searchData.key) {
      if (countryData.Total) {
        obj = countryData[searchData.key][searchData.parameter];
      } else {
        obj = apiData.global[searchData.key][searchData.parameter];
      }
    } else {
      obj = apiData.global.Total.cases
    }
    for (let key in obj) {
      const newDate = {};
      newDate.data = key;
      newDate.value = obj[key];
      newData.push(newDate);
    }


    chart.data = newData;
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'data';
    categoryAxis.renderer.labels.template.fontSize = 14;

    // categoryAxis.title.text = "Countries";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 14;

    if (isDarkTheme) {
      categoryAxis.renderer.labels.template.fill = am4core.color('#ffffff');
      valueAxis.renderer.labels.template.fill = am4core.color('#ffffff');
      valueAxis.renderer.grid.template.stroke = am4core.color('#ffffff');
      categoryAxis.renderer.grid.template.stroke = am4core.color('#ffffff');
    }
    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'data';
    series.name = 'Sales';
    series.stroke = am4core.color('#C8244D');
    series.columns.template.tooltipText = 'Date: {categoryX}\nValue: {valueY}';
    series.columns.template.fill = am4core.color('#ffffff'); // fill

    chart.current = chart;
  }, [countryData, searchData.parameter, searchData.key, isDarkTheme]);
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
