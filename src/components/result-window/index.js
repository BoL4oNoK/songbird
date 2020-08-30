import React from 'react';

import './index.scss';

const maxScore = 30;

const ScoreResult = ({ score }) => {
  const resultText = `Вы набрали ${score} из ${maxScore} возможных.`;
  return (
    <h3 className="your-score">{resultText}</h3>
  );
};

const GreatestAnswer = ({ score }) => (
  <>
    <ScoreResult score={score} />
    <p className="description">Вы истинный знаток птичьих голосов.</p>
  </>
);

const GeneralAnswer = ({ score, onNewGameBtnClick }) => (
  <>
    <ScoreResult score={score} />
    <button type="button" className="new-game-button" onClick={onNewGameBtnClick}>Сыграть снова</button>
  </>
);

const ResultWindow = ({ score, onNewGameBtnClick }) => {
  const ResultElement = (score === maxScore)
    ? <GreatestAnswer score={score} />
    : <GeneralAnswer score={score} onNewGameBtnClick={onNewGameBtnClick} />;

  return (
    <div className="result-window">
      {ResultElement}
    </div>
  );
};

export default ResultWindow;
