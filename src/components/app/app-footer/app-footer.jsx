import React from 'react';
import './app-footer.scss';

import Base from '@/components/base';
import { authors, links } from '@/data/footer-links';

export default function AppFooter() {
  return (
    <div className="app-footer footer">
      <div className="footer-links">
        <FooterList title="Authors" linkList={authors} />
        <FooterList title="Links" linkList={links} />
      </div>
      <FooterCourse />
    </div>
  );
}

function FooterList({title, linkList}) {
  function drawLinks() {
    return linkList.map((link, index) => <Base.Link key={index} {...link} />);
  }

  return (
    <div className="footer-list footer-section">
      <div className="footer-title title">{title}</div>
      {drawLinks()}
    </div>
  );
}

function FooterCourse() {
  return (
    <div className="footer-course footer-section">
      <div className="footer-title title">RSSchool - 2020</div>
      <a className="footer-course-link click" href="https://rs.school/js/" target="_blank">
        <img src="https://rs.school/images/rs_school_js.svg" alt="RSSchool" />
      </a>
    </div>
  )
}
