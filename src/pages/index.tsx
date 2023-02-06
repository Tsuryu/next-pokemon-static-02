import { FC } from 'react';

import { GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';

import { Layout } from '@/layouts';
import { pokemonApi } from '@/api';
import { Pokemon, PokemonsResponse } from '@/interfaces';
import { PokemonCard } from '@/components';

interface Props {
  pokemons: Pokemon[];
}

const Home: FC<Props> = ({ pokemons }) => (
  <Layout title="Pokemon aplication">
    <Grid.Container gap={2} justify="flex-start">
      {pokemons.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </Grid.Container>
  </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await pokemonApi.get<PokemonsResponse>('/pokemon?limit=151');

  const pokemons: Pokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  };
};

export default Home;
