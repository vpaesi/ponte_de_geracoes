import { PlatformDescription, CriarContaBtn, EncontrarUsuariosBtn } from "./ui";
import ActiveSupport from "../assets/active-support.svg";

interface HeroSectionProps {
  userType?: string;
}

export default function HeroSection({ userType }: HeroSectionProps) {
  return (
    <section className="relative py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Pontes que aproximam e transformam vidas.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              <PlatformDescription />
            </p>
            <div className="pt-4">
              {userType === "default" ? (
                <CriarContaBtn to="/signup" variant="primary" size="lg" />
              ) : (
                <EncontrarUsuariosBtn to="/users" size="lg" />
              )}
            </div>
          </div>
          <img
            src={ActiveSupport}
            alt="Imagem do cabeçalho"
            className="w-full h-80 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
