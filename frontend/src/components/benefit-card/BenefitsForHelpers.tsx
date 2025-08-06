import { BENEFITS_FOR_HELPERS } from '../../constants/benefits';
import BenefitCard from './BenefitCard';

const BenefitsForHelpers = () => {
  return (
    <section className="benefits-section">
      {BENEFITS_FOR_HELPERS.map((benefit, index) => (
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

export default BenefitsForHelpers;
