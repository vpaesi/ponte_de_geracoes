import { useMemo } from 'react';
import { BENEFITS, getBenefitsBycategoria, getBenefitById, type Benefit } from '../constants/benefits';

export const useBenefits = () => {
  const allBenefits = useMemo(() => BENEFITS, []);

  const getBenefits = useMemo(() => ({
    all: allBenefits,
    bycategoria: (categoria: Benefit['categoria']) => getBenefitsBycategoria(categoria),
    byId: (id: string) => getBenefitById(id),
    social: getBenefitsBycategoria('social'),
    health: getBenefitsBycategoria('health'),
    learning: getBenefitsBycategoria('learning'),
    personal: getBenefitsBycategoria('personal'),
    security: getBenefitsBycategoria('security'),
  }), [allBenefits]);

  return getBenefits;
};