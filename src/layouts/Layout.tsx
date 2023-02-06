import { PropsWithChildren } from 'react';

import Head from 'next/head';

import Navbar from '@/components/Navbar';
import { envUtils } from '@/utils';

interface Props {
  title?: string;
}

const Layout = ({ children, title = 'Pokemon App' }: PropsWithChildren<Props>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Sergio Velazquez" />
        <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={`Informacion sobre ${title}`} />
        <meta property="og:description" content={`Descripcion detallada sobre ${title}`} />
        <meta property="og:image" content={!envUtils.isServer() ? `${window.origin}/assets/banner.png` : ''} />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
