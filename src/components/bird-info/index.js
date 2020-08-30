import React from 'react';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './index.scss';

const BirdInfo = ({
  birdinfo, birdPlayerRef,
  randomPlayerRef, audioPlayerStopFn,
}) => {
  const {
    name, species,
    description,
    image, audio,
  } = birdinfo;

  const img = image ? <img src={image} alt={name} className="bird-info__image" /> : null;
  const player = audio
    ? (
      <AudioPlayer
        ref={birdPlayerRef}
        src={audio}
        autoPlayAfterSrcChange={false}
        onPlay={() => audioPlayerStopFn(randomPlayerRef)}
      />
    )
    : null;

  return (
    <div className="col-md-6">
      <div className="d-flex">
        {img}
        <div className="bird-info__main-data">
          <h3>{name}</h3>
          <p>{species}</p>
          {player}
        </div>
      </div>
      <p className="bird-info__description">{description}</p>
    </div>
  );
};

export default BirdInfo;
