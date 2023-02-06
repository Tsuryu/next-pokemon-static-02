import { FC } from 'react';

import { Grid } from '@nextui-org/react';
import { FavoritePokemon } from './FavoritePokemon';

interface Props {
  favorites: number[];
}

export const FavoritePokemonList: FC<Props> = ({ favorites }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favorites.map((id) => (
        <FavoritePokemon id={id} key={id} />
      ))}
    </Grid.Container>
  );
};
