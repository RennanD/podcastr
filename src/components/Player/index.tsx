import { IconButton } from '@components/IconButton';
import {
  PlayerContainer,
  EmptyPlayer,
  Progress,
  EmptySlider,
  ButtonContainer,
  PlayButton,
  PlayerFooter,
  Slider,
} from './styles';

export function Player(): JSX.Element {
  return (
    <PlayerContainer>
      <header>
        <img src="/playing.svg" alt="Tocando Agora" />
        <strong>Tocando agora</strong>
      </header>

      <EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </EmptyPlayer>

      <PlayerFooter isEmpty>
        <Progress>
          <span>00:00</span>

          <Slider>
            <EmptySlider />
          </Slider>

          <span>00:00</span>
        </Progress>

        <ButtonContainer>
          <IconButton type="button">
            <img src="/shuffle.svg" alt="Embaralhar" />
          </IconButton>
          <IconButton type="button">
            <img src="/play-previous.svg" alt="Tocar Anterior" />
          </IconButton>

          <PlayButton type="button">
            <img src="/play.svg" alt="Tocar" />
          </PlayButton>

          <IconButton type="button">
            <img src="/play-next.svg" alt="Tocrar Próxima" />
          </IconButton>
          <IconButton type="button">
            <img src="/repeat.svg" alt="Repetir" />
          </IconButton>
        </ButtonContainer>
      </PlayerFooter>
    </PlayerContainer>
  );
}
