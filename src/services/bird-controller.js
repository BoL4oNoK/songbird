import birdsData from './data';

const RandomBirdImage = '/images/random_bird.jpg';
const CorrectAudio = '/audio/correct.mp3';
const ErrorAudio = '/audio/error.mp3';

export default class BirdController {
  constructor() {
    this.dataArray = birdsData;
    this.player = new Audio();
    this.state = {
      score: 0,
      currentTab: 1,
      randomBird: null,
      maxScorePerLevel: 5,
      rightAnswer: false,
      resultStage: false,
    };
  }

  getScore() {
    return this.state.score;
  }

  getTabs() {
    const activeTab = this.state.currentTab;
    return this.dataArray.map((elem) => {
      const resObject = {
        tabId: elem.tabId,
        tabTitle: elem.tabTitle,
        tabActive: (activeTab === elem.tabId),
      };
      return resObject;
    });
  }

  decreaseMaxScore() {
    this.state.maxScorePerLevel = this.state.maxScorePerLevel - 1;
    if (this.state.maxScorePerLevel < 0) {
      this.state.maxScorePerLevel = 0;
    }
  }

  increaseScore() {
    this.state.score += this.state.maxScorePerLevel;
  }

  getBirdsList() {
    const index = this.state.currentTab - 1;

    return this.dataArray[index].data;
  }

  getRandomBird(correct = false, randomize = true) {
    const maxElements = 6;
    let randomBirdObj = {};
    if (randomize) {
      const index = Math.floor(Math.random() * maxElements);

      this.state.randomBird = this.dataArray[this.state.currentTab - 1].data[index];
      console.log('Correct reply: ', this.state.randomBird.name);
    }
    if (!correct) {
      randomBirdObj = {
        name: '***',
        audio: this.state.randomBird.audio,
        image: RandomBirdImage,
      };
    } else {
      randomBirdObj = {
        name: this.state.randomBird.name,
        audio: this.state.randomBird.audio,
        image: this.state.randomBird.image,
      };
    }

    return randomBirdObj;
  }

  getBirdInfo(birdId) {
    if (!birdId) {
      return {
        name: '***',
        species: '***',
        description: 'Выберите птицу из списка слева.',
        image: false,
        audio: false,
      };
    }

    const { currentTab } = this.state;

    return this.dataArray[currentTab - 1].data.find((element) => element.id === birdId);
  }

  checkReply(birdId) {
    if (this.state.rightAnswer) {
      return true;
    }
    if (this.state.randomBird.id === birdId) {
      this.increaseScore();
      this.state.rightAnswer = true;
      this.playAudio(CorrectAudio);
      return true;
    }

    this.decreaseMaxScore();
    this.playAudio(ErrorAudio);

    return false;
  }

  setIndicator(birdId) {
    return (this.state.randomBird.id === birdId);
  }

  newGame() {
    this.state.currentTab = 1;
    this.state.maxScorePerLevel = 5;
    this.state.score = 0;
    this.state.rightAnswer = false;
    this.state.resultStage = false;
  }

  nextLevel() {
    this.state.currentTab += 1;
    this.state.maxScorePerLevel = 5;
    this.state.rightAnswer = false;

    if (this.state.currentTab > 6) {
      this.state.resultStage = true;
      this.state.currentTab = 1;
    }
  }

  isGameFinished() {
    return this.state.resultStage;
  }

  playAudio(src) {
    this.player.src = src;
    this.player.play();
  }
}
