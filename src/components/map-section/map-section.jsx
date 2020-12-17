import React, { useState, useLayoutEffect, useRef } from 'react';
import './map-section.scss';

import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Section from '../section';
import MapLegend from './map-legend';
import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
am4core.useTheme(am4themes_animated);
export default function MapSection(props) {
  const { currentTheme, openFullscreen, /* setSelectedCountry */ } = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  const [searchData, setSearchData] = useState(getSearchData(textLabel));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  const sectionProps = {
    sectionType: 'map',
    headerProps: {
      title: 'Map',
      headerIcon: MapLegend({ currentTheme }),
      currentTheme,
      textLabel,
      updateApiData: (key, label) => {
        const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
        setSearchData(getSearchData(updatedTextLabel));
      },
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Map',
        currentFullscreenContent: MapSectionFullscreenContent(),
      });
    },
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

    map.homeZoomLevel = 1;

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;

    polygonTemplate.tooltipText = '{name}: {value}';
    polygonTemplate.fill = am4core.color('#aac4e7');

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = map.colors.getIndex(0);

    // Create active state
    const activeState = polygonTemplate.states.create('active');
    activeState.properties.fill = am4core.color('#ff0000');

    // Create an event to toggle "active" state
    polygonTemplate.events.on('hit', function (event) {
      console.log(event);
      event.target.isActive = !event.target.isActive;
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

function MapSectionFullscreenContent() {
  return (
    <div className="map-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
