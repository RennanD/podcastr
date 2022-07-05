// import { Container } from './styles';

import { api } from '@services/api';
import {
  Description,
  EpisodeContainer,
  EpisodeWrapper,
  ThumbnailContainer,
} from '@styles/pages/episodes';
import { convertDuration } from '@utils/convertDuration';
import { formatDate } from '@utils/formatDate';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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

type EpisodeDetailsProps = {
  episode: EpisodeProps;
};

export default function EpisodeDetails({
  episode,
}: EpisodeDetailsProps): JSX.Element {
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

            <button type="button">
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

  const response = await api.get(`/episodes/${slug}`);

  const episode = {
    ...response.data,

    publishedAtFormatted: formatDate(response.data.published_at, 'd MMM yy'),
    file: {
      ...response.data.file,
      durationTimeString: convertDuration(response.data.file.duration),
    },
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
