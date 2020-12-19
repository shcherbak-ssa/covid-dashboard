import React, { useEffect, useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import './chart-section.scss';

import { CHART_OPTIONS_MENU_TYPE, TOTAL_TYPE_OPTION } from '../../constants';
import Section from '../section';

const DEFAULT_SECTION_TITLE = 'Global';

export default function ChartSection(props) {
  const { isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry } = props;
  const [searchData, setSearchData] = useState({});
  const [sectionTitle, setSectionTitle] = useState('');
  const [content, setContent] = useState({});
  const [apiData, setApiData] = useState(props.apiData);

  useEffect(() => {
    setSearchData(getSearchData(options));
  }, [options]);

  useEffect(() => {
    const title = selectedCountry ? selectedCountry.countryName : DEFAULT_SECTION_TITLE;
    setSectionTitle(title);
    updateContent();
  }, [selectedCountry]);
  useEffect(() => {
    let chart = am4core.create("chartdiv1", am4charts.XYChart);
    let newData = [];
    let obj = {};
    switch (options.parameter) {
      case 'cases':
        obj = apiData.global.Total.cases;
        break;
      case 'deaths':
        obj = apiData.global.Total.deaths;

        break;
      case 'recovered':
        obj = apiData.global.Total.recovered;
        break;
      default:
        alert("Нет таких значений");
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
    categoryAxis.dataFields.category = "data";
    // categoryAxis.title.text = "Countries";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.title.text = "Litres sold (M)";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "data";
    series.name = "Sales";
    series.columns.template.tooltipText = "Date: {categoryX}\nValue: {valueY}";
    series.columns.template.fill = am4core.color("#00ff00"); // fill



    chart.current = chart;

  });

  const sectionProps = {
    sectionType: 'chart',
    optionsMenuType: CHART_OPTIONS_MENU_TYPE,
    headerProps: {
      title: 'Chart',
      isDarkTheme,
      options: transformOptions(options),
    },
    updateOptions,
    optionMenuItems,
  };

  function updateContent() {
    const searchData = getSearchData(options);
    const searchObject = selectedCountry || apiData.global;
    setContent(searchObject[searchData.key]);
  }

  function transformOptions({ parameter, measurement }) {
    return {
      type: TOTAL_TYPE_OPTION,
      parameter,
      measurement,
    };
  }

  function getSearchData({ parameter, measurement }) {
    return {
      key: TOTAL_TYPE_OPTION + measurement,
      parameter,
    };
  }

  return (
    <Section {...sectionProps}>
      <div className="chart-section-content">
        <div id="chartdiv1" style={{ width: "100%", height: "100%" }}></div>
      </div>
    </Section>
  );
}
