import React from 'react';

import './index.scss';

const BirdsList = ({ birdslist, birdsIndicators, onBirdSelect }) => {
  const listElements = birdslist.map(({ id, name }, index) => {
    const spanClassList = `li-indicator ${birdsIndicators[index] || ''}`;
    return (
      <li className="birds-list-item" key={id} onClick={() => onBirdSelect(id)} role="presentation" value={name}>
        <span className={spanClassList} />
        <span className="bird-name">{ name }</span>
      </li>
    );
  });

  return (
    <div className="col-md-6">
      <ul className="birds-data-item birds-list">
        {listElements}
      </ul>
    </div>
  );
};

export default BirdsList;
