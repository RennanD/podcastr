import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import {
  AllEpisodes,
  EpisodeDetails,
  HomeContainer,
  LatestEpisodes,
} from '@styles/pages/home';

import { Anchor } from '@components/Anchor';
import { usePlayer } from '@hooks/player';

import { convertDuration } from '@utils/convertDuration';
import { formatDate } from '@utils/formatDate';

import { ApolloClientContext, withApollo } from '@lib/withApollo';

import {
  getServerPageGetAllEpisode,
  ssrGetAllEpisode,
} from '@graphql/generated/page';

type EpisodeProps = {
  id: string;
  title: string;
  members: string;
  published_at: Date;
  thumbnail: string;
  publishedAtFormatted: string;
  file: {
    url: string;
    duration: number;
    durationTimeString: string;
  };
};

type HomeProps = {
  allEpisodes: EpisodeProps[];
  latestEpisodes: EpisodeProps[];
};

function Home({ allEpisodes, latestEpisodes }: HomeProps) {
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

export const getStaticProps: GetStaticProps = async ctx => {
  const query = () => {
    return getServerPageGetAllEpisode(null, ctx as ApolloClientContext);
  };

  const resp = await query();

  return {
    props: resp.props,
    revalidate: 60 * 60 * 8,
  };
};

export default withApollo(
  ssrGetAllEpisode.withPage()(props => {
    const latestEpisodes = props.data.latestEpisodes.map(episode => ({
      id: episode.id,
      members: episode.members,
      title: episode.title,
      thumbnail: episode.thumbnail,
      published_at: episode.publishedAt as Date,
      publishedAtFormatted: formatDate(episode.publishedAt, 'd MMM yy'),
      file: {
        url: episode.file.url,
        duration: episode.file.duration,
        durationTimeString: convertDuration(episode.file.duration),
      },
    }));

    const allEpisodes = props.data.allEpisodes.map(episode => ({
      id: episode.id,
      members: episode.members,
      title: episode.title,
      thumbnail: episode.thumbnail,
      published_at: episode.publishedAt as Date,
      publishedAtFormatted: formatDate(episode.publishedAt, 'd MMM yy'),
      file: {
        url: episode.file.url,
        duration: episode.file.duration,
        durationTimeString: convertDuration(episode.file.duration),
      },
    }));

    return <Home latestEpisodes={latestEpisodes} allEpisodes={allEpisodes} />;
  }),
);
