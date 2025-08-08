import Beneficios from "../comuns/Beneficios";

export default function SecaoBeneficios() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Benefícios mútuos
        </h2>
        <div>
          <Beneficios />
        </div>
      </div>
    </section>
  );
}
