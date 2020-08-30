import React from 'react';

import './index.scss';

const NextButton = ({ onClick, disabled }) => <button type="button" className="next-button" onClick={onClick} disabled={disabled}>Следующий уровень</button>;

export default NextButton;
