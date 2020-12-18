import React, { useState, useLayoutEffect, useRef } from 'react';
import './map-section.scss';

// import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import { getSearchData } from '../../tools';
import Section from '../section';
import MapLegend from './map-legend';
import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
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

  useLayoutEffect(() => {
    let map = am4core.create('chartdiv', am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    // Set projection
    map.projection = new am4maps.projections.Miller();
    map.zoomControl = new am4maps.ZoomControl();

    console.log('apiData', apiData);
    console.log('isDarkTheme', isDarkTheme);
    console.log('options', options);
    console.log('selectedCountry', selectedCountry);
    console.log('optionMenuItems', optionMenuItems);
    console.log('updateOptions', updateOptions);
    console.log('setSelectedCountry', setSelectedCountry);

    map.homeZoomLevel = 1;
    console.log('am4geodata_worldLow', am4geodata_worldLow);

    let ab = am4geodata_worldLow.features.map((el) => {
      return { id: el.properties.id, name: el.properties.name };
    });
    // Configure series
    console.log(ab);

    apiData.forEach((element) => {
      if (-1 === ab.findIndex((el) => el.name === element.countryName)) {
        console.log('not find ', element);
      }
    });
    const polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.tooltipText = '{name}: {value1} {value2}';
    polygonTemplate.fill = am4core.color('#aac4e7');

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = map.colors.getIndex(0);

    // Create active state
    const activeState = polygonTemplate.states.create('active');
    activeState.properties.fill = am4core.color('#ff0000');

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    // Add some data
    polygonSeries.data = [{
      "id": "BY",
      "name": "Belarus",
      "value1": "3",
      "value2": "%",
      "fill": am4core.color("#F05C5C")
    }, {
      "id": "FR",
      "name": "France",
      "value": 50,
      "fill": am4core.color("#5C5CFF")
    }];

    map.background.fill = am4core.color("#aadaff");
    map.background.fillOpacity = 1;

    //map background
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#aaffda");
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

    map.panBehavior = "rotateLong";

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = "fill";
    let imageSeries = new am4maps.MapImageSeries();
    map.series.push(imageSeries);
    let imageSeriesTemplate = imageSeries.mapImages.template;
    let circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#B27799");
    circle.stroke = am4core.color("#FFFFFF");
    circle.strokeWidth = 2;
    circle.nonScaling = true;
    circle.tooltipText = "{name}";

    // Create an event to toggle "active" state
    polygonTemplate.events.on('hit', function (event) {
      console.log(event);
      // event.target.isActive = !event.target.isActive;
      console.log(event.target.dataItem.dataContext);
    });

    chart.current = map;
    return () => {
      map.dispose();
    };
  }, []);
  return (
    <Section {...sectionProps}>
      {<div id="chartdiv" style={{ width: "100%", height: "calc(100% - 32px)" }}></div>}
    </Section>
  );
}
