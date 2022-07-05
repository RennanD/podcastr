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
  play: (episode: Episode) => void;
  togglePlay: () => void;
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

  function handlePlayEpisode(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function handleTogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function handleSetIsPlaying(defatultValue: boolean) {
    setIsPlaying(defatultValue);
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
