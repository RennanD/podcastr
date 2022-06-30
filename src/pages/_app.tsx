import { Header } from '@components/Header';
import { Player } from '@components/Player';
import { AppWrapper } from '@styles/app.styles';

import Global from '@styles/global';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global />

      <AppWrapper>
        <main>
          <Header />

          <Component {...pageProps} />
        </main>

        <Player />
      </AppWrapper>
    </>
  );
}

export default MyApp;
