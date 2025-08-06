import { BENEFITS_FOR_ASSISTED } from '../../constants/benefits';
import BenefitCard from './BenefitCard';

const BenefitsForAssisted = () => {
  return (
    <section className="benefits-section">
      {BENEFITS_FOR_ASSISTED.map((benefit, index) => (
        <BenefitCard
          key={index}
          title={benefit.title}
          description={benefit.description}
          icon={benefit.icon}
        />
      ))}
    </section>
  );
};

export default BenefitsForAssisted;
