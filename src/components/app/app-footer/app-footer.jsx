import React from 'react';
import './app-footer.scss';

import Base from '../../base';
import { authors } from '../../../data/footer-links';

export default function AppFooter() {
  function drawLinks() {
    return authors.map((link, index) => <Base.Link key={index} {...link} />);
  }

  return (
    <div className="app-footer footer flex-space-between">
      <div className="footer-links">
        <span>2020</span>
        {drawLinks()}
      </div>
      <div className="footer-course">
        <a className="footer-course-link click" href="https://rs.school/js/" target="_blank">
          <img src="https://rs.school/images/rs_school_js.svg" alt="RSSchool" />
        </a>
      </div>
    </div>
  );
}
