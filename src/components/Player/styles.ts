import styled, { css } from 'styled-components';

export const PlayerContainer = styled.div`
  width: 26.5rem;
  height: 100vh;
  padding: 3rem 4rem;

  background-color: var(--purple-500);
  color: var(--white);

  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  strong {
    font-family: 'Lexend', sans-serif;
    font-weight: 600;
  }
`;

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 20rem;
  border: 1.5px dashed var(--purple-300);
  border-radius: 1.5rem;
  background: linear-gradient(
    143.8deg,
    rgba(145, 100, 250, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 4rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type PlayerFooterProps = {
  isEmpty?: boolean;
};
export const PlayerFooter = styled.footer<PlayerFooterProps>`
  align-self: stretch;

  ${({ isEmpty }) =>
    isEmpty &&
    css`
      opacity: 0.5;
    `}
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }
`;

export const Slider = styled.div`
  flex: 1;
`;

export const EmptySlider = styled.div`
  width: 100%;
  height: 4px;
  background-color: var(--purple-300);
  border-radius: 2px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1.5rem;
`;

export const PlayButton = styled.button`
  height: 4rem;
  width: 4rem;
  border-radius: 1rem;
  border: 0;
  background: var(--purple-400);
`;
