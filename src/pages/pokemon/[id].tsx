import { FC, useState } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import canvasConfetti from 'canvas-confetti';

import { Layout } from '@/layouts';
import { PokemonData } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { localFavorites, pokemonUtils } from '@/utils';

interface Props {
  pokemon: PokemonData;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

  const handleToogleFavorite = () => {
    localFavorites.toogleFavorite(pokemon.id);
    setIsInFavorites((state) => !state);
    if (!isInFavorites)
      canvasConfetti({
        zIndex: 999999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0
        }
      });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color="gradient" bordered={!isInFavorites} onPress={handleToogleFavorite}>
                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons = [...Array(151)].map((value, id) => `${id + 1}`);

  return {
    paths: pokemons.map((id) => ({
      params: {
        id
      }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => ({
  props: {
    pokemon: await pokemonUtils.getPokemonInfo(context.params?.id as string)
  }
});

export default PokemonPage;
