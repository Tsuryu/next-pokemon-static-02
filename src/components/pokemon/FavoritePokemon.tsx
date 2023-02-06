import { FC } from 'react';

import { Card, Grid } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface Props {
  id: number;
}

export const FavoritePokemon: FC<Props> = ({ id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id} onClick={handleClick}>
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt="Pokemon favorito"
        />
      </Card>
    </Grid>
  );
};
