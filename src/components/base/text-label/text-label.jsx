import React from 'react';
import './text-label.scss';

export default function TextLabel({value}) {
  return (
    <div className="text-label">{ value }</div>
  );
}