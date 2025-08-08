import React from "react";

interface SobreVoceSectionProps {
  dados: {
    aboutYou?: string;
    sobreMim?: string;
    skills?: string;
    habilidades?: string;
    needs?: string;
    necessidades?: string;
    availableDays?: string[];
    diasDisponiveis?: string[];
  };
  userType: string;
  atualizarCampo: (campo: string, valor: string | string[]) => void;
  onDiasDisponiveisChange: (event: React.ChangeEvent<HTMLInputElement>, dia: string) => void;
}

export const SobreVoceSection: React.FC<SobreVoceSectionProps> = ({
  dados,
  userType,
  atualizarCampo,
  onDiasDisponiveisChange,
}) => {
  const aboutYouField = dados.aboutYou ?? dados.sobreMim ?? "";
  const skillsField = dados.skills ?? dados.habilidades ?? "";
  const needsField = dados.needs ?? dados.necessidades ?? "";
  const availableDaysField = dados.availableDays ?? dados.diasDisponiveis ?? [];

  const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">
        Sobre Você
      </h2>

      <div className="space-y-6">
        {/* Sobre você */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Fale um pouco sobre você
          </label>
          <textarea
            rows={4}
            placeholder="Conte um pouco sobre sua personalidade, hobbies, experiências..."
            value={aboutYouField}
            onChange={(e) => atualizarCampo(dados.aboutYou !== undefined ? "aboutYou" : "sobreMim", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
          />
        </div>

        {/* Habilidades/Necessidades */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {userType === "ajudante" ? "Suas Habilidades" : "Suas Necessidades"}
          </label>
          <textarea
            rows={3}
            placeholder={userType === "ajudante" ? "Liste suas habilidades..." : "Liste suas necessidades..."}
            value={userType === "ajudante" ? skillsField : needsField}
            onChange={(e) => {
              const campo = userType === "ajudante" 
                ? (dados.skills !== undefined ? "skills" : "habilidades")
                : (dados.needs !== undefined ? "needs" : "necessidades");
              atualizarCampo(campo, e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
          />
        </div>

        {/* Dias disponíveis */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-accent-700">
            {userType === "ajudante" ? "Quando você está disponível para ajudar?" : "Quando você precisaria de ajuda?"}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {diasSemana.map((dia) => (
              <label key={dia} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availableDaysField.includes(dia)}
                  onChange={(e) => onDiasDisponiveisChange(e, dia)}
                  className="w-4 h-4 text-primary-600 border-accent-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-accent-700">{dia.slice(0, 3)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};