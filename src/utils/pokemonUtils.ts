import { pokemonApi } from '@/api';
import { PokemonData } from '@/interfaces';

export const getPokemonInfo = async (pokemonId: string) => {
  try {
    const { data } = await pokemonApi.get<PokemonData>(`/pokemon/${pokemonId}`);
    const { id, name, sprites } = data;

    return {
      id,
      name,
      sprites
    };
  } catch (error) {
    return null;
  }
};
