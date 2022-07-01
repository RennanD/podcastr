import { Anchor } from '@components/Anchor';
import { formatDate } from '@utils/formatDate';

import { HeaderContainer } from './styles';

export function Header(): JSX.Element {
  const currentDate = formatDate(new Date(), 'EEEEEE, d MMMM');

  return (
    <HeaderContainer>
      <Anchor href="/">
        <img src="/podcastr-logo.svg" alt="Podcastr Logo" />
      </Anchor>

      <p>O melhor para voce ouvir sempre.</p>
      <span>{currentDate}</span>
    </HeaderContainer>
  );
}
