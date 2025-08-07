import { CarouselItem } from "../types";
import Carousel from "./Carousel";
import { EncontrarUsuariosBtn } from "./ui";

interface ListaOfUsersSectionProps {
  loading: boolean;
  carouselItems: CarouselItem[];
}

export default function ListaOfUSersSection({
  loading,
  carouselItems,
}: ListaOfUsersSectionProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {loading ? (
          <div className="flex flex-col items-center space-y-4 py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            <p className="text-gray-600 text-lg">Carregando ajudantes...</p>
          </div>
        ) : (
          <div>
            <Carousel
              title="Conheça alguns dos nossos ajudantes"
              registered={carouselItems}
            />
          </div>
        )}
        <div className="pt-6">
          <EncontrarUsuariosBtn to="/users" variant="outline" size="lg">
            Encontrar ajudantes
          </EncontrarUsuariosBtn>
        </div>
      </div>
    </section>
  );
}
