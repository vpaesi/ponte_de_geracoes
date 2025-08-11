import { useCallback } from 'react';

export const useEmbaralhaLista = () => {
  const embaralhaLista = useCallback(<T,>(array: T[]): T[] => {
    const listaEmbaralhada = [...array];
    for (let i = listaEmbaralhada.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listaEmbaralhada[i], listaEmbaralhada[j]] = [listaEmbaralhada[j], listaEmbaralhada[i]];
    }
    return listaEmbaralhada;
  }, []);

  return { shuffleArray: embaralhaLista };
};