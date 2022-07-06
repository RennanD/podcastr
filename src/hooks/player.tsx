import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  file: {
    duration: number;
    url: string;
  };
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setIsPlaying: (defatultValue?: boolean) => void;
};
const PlayerContext = createContext({} as PlayerContextData);

type PlayerProviderProps = {
  children: ReactNode;
};
export function PlayerProvider({ children }: PlayerProviderProps) {
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function handlePlayEpisode(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function handlePlayList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function handleTogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function handleToggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function handleToggleLoop() {
    setIsLooping(!isLooping);
  }

  function handleSetIsPlaying(defatultValue: boolean) {
    setIsPlaying(defatultValue);
  }

  function handlePlayNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length,
      );

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (nextEpisodeIndex < episodeList.length) {
      setCurrentEpisodeIndex(nextEpisodeIndex);
    }
  }

  function handlePlayPrevious() {
    const previousEpisodeIndex = currentEpisodeIndex - 1;

    if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(previousEpisodeIndex);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        episodeList,
        play: handlePlayEpisode,
        isPlaying,
        togglePlay: handleTogglePlay,
        setIsPlaying: handleSetIsPlaying,
        playList: handlePlayList,
        playNext: handlePlayNext,
        playPrevious: handlePlayPrevious,
        isLooping,
        toggleLoop: handleToggleLoop,
        isShuffling,
        toggleShuffle: handleToggleShuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }

  return context;
}
