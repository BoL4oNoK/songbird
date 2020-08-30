import React from 'react';

import './index.scss';

const AppHeader = ({ score }) => {
  const scoreText = `Score ${score}`;
  return (
    <header className="header">
      <a href="/" title="На главную">
        <h1 className="header-logo">
          Song
          <span>Bird</span>
        </h1>
      </a>
      <div className="header-score">{scoreText}</div>
    </header>
  );
};

export default AppHeader;
