import styled, { css } from 'styled-components';

export const IconButton = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 0;

  transition: filter 0.2s ease;

  &:hover:not(:disabled) {
    filter: brightness(0.8);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: default;
    `}
`;
