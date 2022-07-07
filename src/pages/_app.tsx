import { Header } from '@components/Header';
import { Player } from '@components/Player';

import { PlayerProvider } from '@hooks/player';

import { AppWrapper } from '@styles/app.styles';

import Global from '@styles/global';

function MyApp({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <Global />

      <AppWrapper>
        <main>
          <Header />

          <Component {...pageProps} />
        </main>

        <Player />
      </AppWrapper>
    </PlayerProvider>
  );
}

export default MyApp;
