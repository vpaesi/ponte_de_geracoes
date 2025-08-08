import { BENEFITS } from "../../constants/benefits";
import CardBeneficio from "./CardBeneficio";

const Beneficios = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {BENEFITS.map((benefit, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardBeneficio
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

export default Beneficios;
