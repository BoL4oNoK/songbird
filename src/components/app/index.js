import React, { Component } from 'react';
import BirdController from '../../services/bird-controller';
import AppHeader from '../app-header';
import TopBar from '../top-bar';
import RandomBird from '../random-bird';
import BirdsList from '../birds-list';
import BirdInfo from '../bird-info';
import NextButton from '../next-button';
import ResultWindow from '../result-window';

import './index.scss';

const correctSpanClass = 'li-right-indicator';
const wrongSpanClass = 'li-wrong-indicator';
const defaultCheckIndicators = [
  null,
  null,
  null,
  null,
  null,
  null,
];

export default class App extends Component {
  constructor() {
    super();

    this.birdsData = new BirdController();

    this.randomBirdPlayer = React.createRef();
    this.birdInfoPlayer = React.createRef();

    this.state = {
      score: this.birdsData.getScore(),
      tabsList: this.birdsData.getTabs(),
      birdsList: this.birdsData.getBirdsList(),
      birdsInfo: this.birdsData.getBirdInfo(),
      randomBird: this.birdsData.getRandomBird(),
      nextButtonDisabled: true,
      checkedIndicators: [...defaultCheckIndicators],
      isGameFinished: this.birdsData.isGameFinished(),
    };

    this.initHandlers();
  }

  updateState() {
    this.setState({
      score: this.birdsData.getScore(),
      tabsList: this.birdsData.getTabs(),
      birdsList: this.birdsData.getBirdsList(),
      birdsInfo: this.birdsData.getBirdInfo(),
      randomBird: this.birdsData.getRandomBird(),
      nextButtonDisabled: true,
      checkedIndicators: [...defaultCheckIndicators],
      isGameFinished: this.birdsData.isGameFinished(),
    });
  }

  updateIndicatorState(index, value) {
    this.setState(({ checkedIndicators }) => {
      const newCheckedIndicators = [...checkedIndicators];
      newCheckedIndicators[index] = value;
      return { checkedIndicators: newCheckedIndicators };
    });
  }

  initHandlers() {
    this.selectBird = (id) => {
      const checkReply = this.birdsData.checkReply(id);
      const liIndicator = this.birdsData.setIndicator(id);

      if (!checkReply) {
        this.updateIndicatorState(id - 1, wrongSpanClass);
      }

      if (checkReply && liIndicator) {
        this.stopPlayingAudio(this.randomBirdPlayer);
        this.updateIndicatorState(id - 1, correctSpanClass);
      }

      this.setState({
        score: this.birdsData.getScore(),
        birdsInfo: this.birdsData.getBirdInfo(id),
        randomBird: this.birdsData.getRandomBird(checkReply, false),
        nextButtonDisabled: !checkReply,
      });
    };

    this.nextLevel = () => {
      this.birdsData.nextLevel();
      this.updateState();
    };

    this.newGame = () => {
      this.birdsData.newGame();
      this.updateState();
    };

    this.stopPlayingAudio = (ref) => {
      if (ref.current) {
        ref.current.audio.current.pause();
      }
    };
  }

  render() {
    const {
      score, tabsList,
      birdsList, birdsInfo,
      randomBird, nextButtonDisabled,
      checkedIndicators, isGameFinished,
    } = this.state;
    return (
      <>
        <AppHeader score={score} />
        <TopBar tablist={tabsList} />
        {
        !isGameFinished
          ? (
            <>
              <RandomBird
                randomBird={randomBird}
                randomPlayerRef={this.randomBirdPlayer}
                birdPlayerRef={this.birdInfoPlayer}
                audioPlayerStopFn={this.stopPlayingAudio}
              />
              <div className="d-flex birds-data">
                <BirdsList
                  birdslist={birdsList}
                  birdsIndicators={checkedIndicators}
                  onBirdSelect={this.selectBird}
                />
                <BirdInfo
                  birdinfo={birdsInfo}
                  randomPlayerRef={this.randomBirdPlayer}
                  birdPlayerRef={this.birdInfoPlayer}
                  audioPlayerStopFn={this.stopPlayingAudio}
                />
              </div>
              <NextButton onClick={this.nextLevel} disabled={nextButtonDisabled} />
            </>
          )
          : <ResultWindow score={score} onNewGameBtnClick={this.newGame} />
        }
      </>
    );
  }
}
