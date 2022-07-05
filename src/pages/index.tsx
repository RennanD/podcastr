import { GetStaticProps } from 'next';
import Image from 'next/image';

import {
  AllEpisodes,
  EpisodeDetails,
  HomeContainer,
  LatestEpisodes,
} from '@styles/pages/home';

import { api } from '@services/api';

import { convertDuration } from '@utils/convertDuration';
import { formatDate } from '@utils/formatDate';
import { Anchor } from '@components/Anchor';
import Head from 'next/head';
import { usePlayer } from '@hooks/player';

type EpisodeProps = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  publishedAtFormatted: string;
  file: {
    url: string;
    type: string;
    duration: number;
    durationTimeString: string;
  };
};

type HomeProps = {
  allEpisodes: EpisodeProps[];
  latestEpisodes: EpisodeProps[];
};

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
  const { playList } = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  function handlePlayListEspisodes(episode: EpisodeProps) {
    const episodeIndex = episodeList.findIndex(
      episodeItem => episodeItem.id === episode.id,
    );

    playList(episodeList, episodeIndex);
  }

  return (
    <>
      <Head>
        <title>Podcastr</title>
      </Head>

      <HomeContainer>
        <LatestEpisodes>
          <h2>Últimos lançamentos</h2>

          <ul>
            {latestEpisodes.map(episode => (
              <li key={episode.id}>
                <Image
                  src={episode.thumbnail}
                  width={120}
                  height={120}
                  alt={episode.title}
                  objectFit="cover"
                />

                <EpisodeDetails>
                  <Anchor href={`/episodes/${episode.id}`}>
                    {episode.title}
                  </Anchor>
                  <p>{episode.members}</p>

                  <span>{episode.publishedAtFormatted}</span>
                  <span>{episode.file.durationTimeString}</span>
                </EpisodeDetails>
                <button
                  type="button"
                  onClick={() => handlePlayListEspisodes(episode)}
                >
                  <img src="/play-green.svg" alt="Botão de iniciar podcast" />
                </button>
              </li>
            ))}
          </ul>
        </LatestEpisodes>

        <AllEpisodes>
          <h2>Todos Episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th />
                <th>Título</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map(episode => (
                <tr key={episode.id}>
                  <td style={{ width: 80 }}>
                    <Image
                      src={episode.thumbnail}
                      width={120}
                      height={120}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Anchor href={`/episodes/${episode.id}`}>
                      {episode.title}
                    </Anchor>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAtFormatted}</td>
                  <td>{episode.file.durationTimeString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handlePlayListEspisodes(episode)}
                    >
                      <img src="/play-green.svg" alt="Tocar Podcast" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AllEpisodes>
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get<EpisodeProps[]>('/episodes', {
    params: {
      _limit: 12,
      sort: '_published_at',
      _order: 'desc',
    },
  });

  const episodes = response.data.map(episode => ({
    ...episode,

    publishedAtFormatted: formatDate(episode.published_at, 'd MMM yy'),
    file: {
      ...episode.file,
      durationTimeString: convertDuration(episode.file.duration),
    },
  }));

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
