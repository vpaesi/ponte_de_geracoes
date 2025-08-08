import { CarouselItem } from "../../types";
import Button from "../comuns/Button";
import Carrossel from "../comuns/Carrossel";
import { UsersIcon } from "@heroicons/react/24/outline";

interface ListaOfUsersSectionProps {
  loading: boolean;
  carouselItems: CarouselItem[];
}

export default function SecaoCarrossel({ loading }: ListaOfUsersSectionProps) {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-16">
        {loading ? (
          <div className="flex flex-col items-center space-y-4 py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-gray-600 text-lg">Carregando usuários...</p>
          </div>
        ) : (
          <div className="">
            {/* Carousel único com todos os tipos de usuários */}
            <Carrossel titulo="Conecte-se com nossa Comunidade" city="" />
          </div>
        )}

        <div style={{ marginTop: "0 !important" }}>
          <Button
            to="/users"
            variant="outline"
            size="md"
            icon={<UsersIcon className="w-5 h-5" />}
          >
            Conhecer comunidade
          </Button>
        </div>
      </div>
    </section>
  );
}
