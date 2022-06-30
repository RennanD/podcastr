import { GetStaticProps } from 'next';

import { HomeContainer, LatestEpisodes } from '@styles/pages/home';

import { api } from '@services/api';

import { convertDuration } from '@utils/convertDuration';
import { formatDate } from '@utils/formatDate';

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
  return (
    <HomeContainer>
      <LatestEpisodes>
        <h2>Últimos lançamentos</h2>
      </LatestEpisodes>

      <ul>
        {latestEpisodes.map(episode => (
          <li key={episode.id}>{episode.title}</li>
        ))}
      </ul>
    </HomeContainer>
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

    publishedAtFormatted: formatDate(episode.published_at, 'EEEEEE, d MMMM'),
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
