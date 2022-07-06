/* eslint-disable jsx-a11y/media-has-caption */
import Image from 'next/image';

import RCSlider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { IconButton } from '@components/IconButton';
import { usePlayer } from '@hooks/player';

import { useEffect, useRef, useState } from 'react';
import { convertDuration } from '@utils/convertDuration';
import {
  PlayerContainer,
  EmptyPlayer,
  CurrentEpisode,
  Progress,
  EmptySlider,
  ButtonContainer,
  PlayButton,
  PlayerFooter,
  Slider,
  ToggleButton,
} from './styles';

export function Player(): JSX.Element {
  const {
    currentEpisodeIndex,
    episodeList,
    isPlaying,
    togglePlay,
    setIsPlaying,
    playNext,
    playPrevious,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
  } = usePlayer();

  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);

  const episode = episodeList[currentEpisodeIndex];

  function handleSetupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      return;
    }

    if (!isPlaying) {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <PlayerContainer>
      <header>
        <img src="/playing.svg" alt="Tocando Agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <CurrentEpisode>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </CurrentEpisode>
      ) : (
        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>
      )}

      <PlayerFooter isEmpty={!episode}>
        <Progress>
          <span>{convertDuration(progress)}</span>

          <Slider>
            {episode ? (
              <RCSlider
                max={episode.file.duration}
                value={progress}
                onChange={(amount: number) => handleSeek(amount)}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <EmptySlider />
            )}
          </Slider>

          <span>{convertDuration(episode?.file.duration ?? 0)}</span>
        </Progress>

        <ButtonContainer>
          <ToggleButton
            isToggle={isShuffling}
            type="button"
            onClick={toggleShuffle}
            disabled={!episode || episodeList.length === 1}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </ToggleButton>

          <IconButton
            type="button"
            disabled={!episode || currentEpisodeIndex === 0}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar Anterior" />
          </IconButton>

          <PlayButton type="button" disabled={!episode} onClick={togglePlay}>
            <img
              src={!isPlaying ? '/play.svg' : '/pause.svg'}
              alt="Controle do Episódio"
            />
          </PlayButton>

          <IconButton
            type="button"
            disabled={
              !episode ||
              (episodeList.length - 1 === currentEpisodeIndex && !isShuffling)
            }
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Tocrar Próxima" />
          </IconButton>
          <ToggleButton
            isToggle={isLooping}
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </ToggleButton>
        </ButtonContainer>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.file.url}
            autoPlay
            loop={isLooping}
            onEnded={playNext}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={handleSetupProgressListener}
          />
        )}
      </PlayerFooter>
    </PlayerContainer>
  );
}
