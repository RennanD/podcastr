import styled from 'styled-components';

export const EpisodeWrapper = styled.div`
  height: calc(100vh - 6.5rem);
  overflow-y: scroll;
`;

export const EpisodeContainer = styled.div`
  max-width: 45rem;
  padding: 3rem 2rem;
  margin: 0 auto;

  header {
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--gray-100);

    h1 {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    span {
      display: inline-block;
      font-size: 0.875rem;

      & + span {
        margin-left: 1rem;
        padding-left: 1rem;

        position: relative;

        &::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #ddd;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;

  img {
    border-radius: 1rem;
  }

  button {
    height: 3rem;
    width: 3rem;
    border-radius: 0.75rem;

    border: 0;
    position: absolute;
    z-index: 5;

    font-size: 0;

    transition: filter 0.2s ease;

    &:hover {
      filter: brightness(0.9);
    }

    &:first-child {
      left: 0;
      top: 50%;
      background-color: var(--purple-500);
      transform: translate(-50%, -50%);
    }

    &:last-child {
      right: 0;
      top: 50%;
      background-color: var(--green-500);
      transform: translate(50%, -50%);
    }
  }
`;

export const Description = styled.div`
  margin-top: 2rem;
  line-height: 1.675rem;
  color: var(--gray-800);

  p {
    margin: 1.5rem 0;
  }
`;
