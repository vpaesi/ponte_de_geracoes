import { BENEFITS } from "../../constants/benefits";
import CardBeneficio from "./CardBeneficio";
import GridContainer from "./GridContainer";

const Beneficios = () => {
  return (
    <GridContainer
      cols={{ default: 1, md: 2, lg: 3 }}
      gap={8}
      maxWidth="7xl"
    >
      {BENEFITS.map((benefit, index) => (
        <CardBeneficio
          key={`benefit-${index}`}
          titulo={benefit.titulo}
          descricao={benefit.descricao}
          icon={benefit.icon}
          iconColor={benefit.iconColor}
        />
      ))}
    </GridContainer>
  );
};

export default Beneficios;
