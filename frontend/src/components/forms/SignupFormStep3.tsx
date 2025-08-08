import React from "react";
import { SignupFormStep3SelectDiasDisponiveis } from "./SignupFormStep3SelectDiasDisponiveis";
import { SignupFormStep3SelectSkills } from "./SignupFormStep3SelectSkills";
import { SignupFormStep3SelectUserType } from "./SignupFormStep3SelectUserType";

interface SignupFormStep3FormData {
  tipoUsuario: string;
  habilidades?: string;
  necessidades?: string;
  sobreMim?: string;
}

interface SignupFormStep3Props {
  formData: SignupFormStep3FormData;
  errors: Record<string, boolean>;
  availableDays: string[];
  updateFormData: (field: string, value: string) => void;
  handleAvailableDaysChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => void;
}

export const SignupFormStep3: React.FC<SignupFormStep3Props> = ({
  formData,
  errors,
  availableDays,
  updateFormData,
  handleAvailableDaysChange,
}) => {
  const handleSkillsChange = (skills: string[]) => {
    const fieldName =
      formData.tipoUsuario === "ajudante" ? "habilidades" : "necessidades";
    updateFormData(fieldName, skills.join(", "));
  };

  const getSelectedSkills = (): string[] => {
    const skillsField =
      formData.tipoUsuario === "ajudante"
        ? formData.habilidades
        : formData.necessidades;
    return skillsField ? skillsField.split(", ").filter((s: string) => s.trim()) : [];
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center">
        Complete seu Perfil
      </h2>

      <SignupFormStep3SelectUserType
        userType={formData.tipoUsuario}
        updateFormData={updateFormData}
      />

      {formData.tipoUsuario && (
        <SignupFormStep3SelectDiasDisponiveis
          userType={formData.tipoUsuario}
          availableDays={availableDays}
          handleAvailableDaysChange={handleAvailableDaysChange}
        />
      )}

      {formData.tipoUsuario && (
        <div className="space-y-8">
          <SignupFormStep3SelectSkills
            userType={formData.tipoUsuario}
            selectedSkills={getSelectedSkills()}
            onSkillChange={handleSkillsChange}
            error={errors.habilidades || errors.necessidades}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fale um pouco sobre você
            </label>
            <textarea
              rows={4}
              placeholder="Conte um pouco sobre sua personalidade, hobbies, experiências..."
              value={formData.sobreMim || ""}
              onChange={(e) => updateFormData("sobreMim", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
