import { useEffect, useState } from 'react';

import { FavoritePokemonList, NoFavorites } from '@/components';
import { Layout } from '@/layouts';
import { localFavorites } from '@/utils';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(localFavorites.getFavorites());
  }, []);

  return (
    <Layout title="Pokemons - favoritos">
      {favorites.length === 0 ? <NoFavorites /> : <FavoritePokemonList favorites={favorites} />}
    </Layout>
  );
};

export default FavoritesPage;
