/* eslint-disable import/no-duplicates */
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { HeaderContainer } from './styles';

export function Header(): JSX.Element {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  return (
    <HeaderContainer>
      <img src="/podcastr-logo.svg" alt="Podcastr Logo" />

      <p>O melhor para voce ouvir sempre.</p>
      <span>{currentDate}</span>
    </HeaderContainer>
  );
}
