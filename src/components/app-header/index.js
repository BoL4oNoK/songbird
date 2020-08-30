import React from 'react';

import './index.scss';

const AppHeader = ({ score }) => {
  const scoreText = `Score ${score}`;
  return (
    <header className="header">
      <h1 className="header-logo">
        Song
        <span>Bird</span>
      </h1>
      <div className="header-score">{scoreText}</div>
    </header>
  );
};

export default AppHeader;
