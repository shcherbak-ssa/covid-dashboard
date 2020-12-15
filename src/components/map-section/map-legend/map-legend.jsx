import React, { useState } from 'react';
import classnames from 'classnames';
import './map-legend.scss';

import { IS_OPEN_CLASSNAME } from '../../../constants';
import Base from '../../base';

export default function MapLegend({currentTheme}) {
  const [isContentOpen, setIsContentOpen] = useState(false);
  const mapLegendContentClassNames = classnames('map-legend-content', {
    [IS_OPEN_CLASSNAME]: isContentOpen,
  });

  const iconProps = {
    currentTheme,
    icon: 'map-legend',
    iconClickHandle: () => {
      setIsContentOpen(!isContentOpen);
    },
  };

  return (
    <div className="map-legend">
      <Base.Icon {...iconProps} />
      <div className={mapLegendContentClassNames}>
        {/* your code */}
      </div>
    </div>
  );
}
