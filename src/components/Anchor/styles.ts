import styled from 'styled-components';

export const StyledAnchor = styled.div`
  a {
    display: block;
    color: var(--gray-800);
    font-family: 'Lexend', sans-serif;
    font-weight: 600;
    text-decoration: none;
    line-height: 1.4rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;
