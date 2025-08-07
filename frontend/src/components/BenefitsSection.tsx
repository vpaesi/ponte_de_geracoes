import Benefits from "./benefit-card/Benefits";

export default function BenefitsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Benefícios
        </h2>
        <div>
          <Benefits />
        </div>
      </div>
    </section>
  );
}
