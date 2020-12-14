import React from 'react';
import './number-view.scss';

export default function NumberView({type, number}) {
  function transformNumber() {
    return `${number}`.split('').reverse().map((item, index) => {
      if ((index + 1) % 3 === 0) return ` ${item}`;
      return item;
    }).reverse().join('');
  }

  return (
    <div className="base-number-view" data-number-type={type}>{transformNumber()}</div>
  );
}
