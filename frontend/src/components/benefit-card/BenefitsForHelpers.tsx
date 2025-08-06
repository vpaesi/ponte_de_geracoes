import { BENEFITS_FOR_HELPERS } from '../../constants/benefits';
import BenefitCard from './BenefitCard';

const BenefitsForHelpers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {BENEFITS_FOR_HELPERS.map((benefit, index) => (
        <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
          <BenefitCard
            title={benefit.title}
            description={benefit.description}
            icon={benefit.icon}
            iconColor={benefit.iconColor}
          />
        </div>
      ))}
    </div>
  );
};

export default BenefitsForHelpers;
