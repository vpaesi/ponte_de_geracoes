import React, { useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import SecaoHero from '../components/secoes/SecaoHero';
import SecaoBeneficios from '../components/secoes/SecaoBeneficios';
import SecaoCarrossel from '../components/secoes/SecaoCarrossel';
import { useHelpers } from '../hooks/useHelpers';

const Home: React.FC = () => {
  const { loading, error, fetchHelpers } = useHelpers();

  useEffect(() => {
    fetchHelpers({ page: 0, size: 10 });
  }, [fetchHelpers]);

  if (error) {
    console.error('Erro ao carregar ajudantes:', error);
  }

  return (
    <PageLayout>
      <SecaoHero />
      <SecaoBeneficios />
      <SecaoCarrossel loading={loading} carouselItems={[]} />
    </PageLayout>
  );
};

export default Home;
