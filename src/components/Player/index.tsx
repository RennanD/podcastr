/* eslint-disable jsx-a11y/media-has-caption */
import Image from 'next/image';

import RCSlider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { IconButton } from '@components/IconButton';
import { usePlayer } from '@hooks/player';

import { useEffect, useRef } from 'react';
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
  } = usePlayer();

  const audioRef = useRef<HTMLAudioElement>(null);

  const episode = episodeList[currentEpisodeIndex];

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
          <span>00:00</span>

          <Slider>
            {episode ? (
              <RCSlider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <EmptySlider />
            )}
          </Slider>

          <span>00:00</span>
        </Progress>

        <ButtonContainer>
          <IconButton type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </IconButton>
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
              !episode || episodeList.length - 1 === currentEpisodeIndex
            }
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Tocrar Próxima" />
          </IconButton>
          <IconButton type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </IconButton>
        </ButtonContainer>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.file.url}
            autoPlay
            loop={isLooping}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
      </PlayerFooter>
    </PlayerContainer>
  );
}
