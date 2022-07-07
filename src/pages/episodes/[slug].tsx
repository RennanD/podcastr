import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import {
  Description,
  EpisodeContainer,
  EpisodeWrapper,
  ThumbnailContainer,
} from '@styles/pages/episodes';

import { usePlayer } from '@hooks/player';

import { ApolloClientContext, withApollo } from '@lib/withApollo';

import {
  getServerPageGetEpisodeDetails,
  ssrGetAllEpisode,
} from '@graphql/generated/page';

import { convertDuration } from '@utils/convertDuration';
import { formatDate } from '@utils/formatDate';
import { Episode } from '@graphql/generated/graphql';

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
    duration: number;
    durationTimeString: string;
  };
};

type EpisodeDetailsProps = {
  episode: EpisodeProps;
};

function EpisodeDetails({ episode }: EpisodeDetailsProps): JSX.Element {
  const { play } = usePlayer();

  // return null;

  return (
    <>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <EpisodeWrapper>
        <EpisodeContainer>
          <ThumbnailContainer>
            <Link href="/">
              <button type="button">
                <img src="/arrow-left.svg" alt="Voltar" />
              </button>
            </Link>

            <Image
              width={700}
              height={300}
              src={episode.thumbnail}
              objectFit="cover"
            />

            <button type="button" onClick={() => play(episode)}>
              <img src="/play.svg" alt="Tocar Episódio" />
            </button>
          </ThumbnailContainer>

          <header>
            <h1>{episode.title}</h1>
            <span>{episode.members}</span>
            <span>{episode.publishedAtFormatted}</span>
            <span>{episode.file.durationTimeString}</span>
          </header>

          <Description
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
        </EpisodeContainer>
      </EpisodeWrapper>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params.slug as string;

  const query = () => {
    return getServerPageGetEpisodeDetails(
      { variables: { slug } },
      context as ApolloClientContext,
    );
  };

  const response = await query();

  // console.log({ respons  e: response.props.data });

  return {
    props: {
      ...response.props,
      episode: response.props.data.episode,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};

type ResponseProps = {
  episode: Episode;
};
export default withApollo(
  ssrGetAllEpisode.withPage()(props => {
    const { episode } = props as unknown as ResponseProps;

    const response: EpisodeProps = {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      description: episode.description,
      published_at: episode.publishedAt,
      publishedAtFormatted: formatDate(episode.publishedAt, 'd MMM yy'),
      thumbnail: episode.thumbnail,
      file: {
        url: episode.file.url,
        duration: episode.file.duration,
        durationTimeString: convertDuration(episode.file.duration),
      },
    };

    return <EpisodeDetails episode={response} />;
  }),
);
