import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './index.scss';

const RandomBird = ({ randomBird }) => {
  const { name, image, audio } = randomBird;
  return (
    <div className="d-flex random-bird">
      <img src={image} alt={name} className="random-bird__image" />
      <div className="random-bird__data">
        <h3>{name}</h3>
        <AudioPlayer src={audio} autoPlayAfterSrcChange={false} />
      </div>
    </div>
  );
};

export default RandomBird;
