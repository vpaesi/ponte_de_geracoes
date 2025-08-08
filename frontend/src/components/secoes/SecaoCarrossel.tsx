import { CarouselItem } from "../../types";
import BtnEncontrarUsuarios from "../comuns/BtnEncontrarUsuarios";
import Carrossel from "../comuns/Carrossel";

interface ListaOfUsersSectionProps {
  loading: boolean;
  carouselItems: CarouselItem[];
}

export default function SecaoCarrossel({ loading }: ListaOfUsersSectionProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center space-y-16">
        {loading ? (
          <div className="flex flex-col items-center space-y-4 py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-gray-600 text-lg">Carregando usuários...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Carousel único com todos os tipos de usuários */}
            <Carrossel title="Conecte-se com Nossa Comunidade" city="" />
          </div>
        )}

        <div className="pt-6 space-y-4">
          <BtnEncontrarUsuarios to="/users" variant="outline" size="lg">
            Ver Todos os Usuários
          </BtnEncontrarUsuarios>
        </div>
      </div>
    </section>
  );
}
