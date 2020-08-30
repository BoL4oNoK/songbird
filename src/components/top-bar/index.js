import React from 'react';

import './index.scss';

const TopBar = (props) => {
  const { tablist } = props;
  const liElements = tablist.map(({ tabId, tabTitle, tabActive }) => {
    let elementClassses = 'top-bar__item';
    if (tabActive) {
      elementClassses += ' top-bar__item_active';
    }

    return (
      <li key={tabId} className={elementClassses}>{ tabTitle }</li>
    );
  });

  return (
    <ul className="pagination top-bar">
      {liElements}
    </ul>
  );
};

export default TopBar;
