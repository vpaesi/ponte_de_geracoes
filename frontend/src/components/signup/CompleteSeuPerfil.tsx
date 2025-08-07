import React from "react";
import { SelecaoDeDiasDisponiveis } from "./SelecaoDeDiasDisponiveis";
import { SelecaoDeSkill } from "./SelecaoDeSkill";
import { SelecaoTipoDeUserForm } from "./SelecaoTipoDeUserForm";

interface ProfileStepProps {
  formData: any;
  errors: Record<string, boolean>;
  availableDays: string[];
  updateFormData: (field: string, value: string) => void;
  handleAvailableDaysChange: (event: React.ChangeEvent<HTMLInputElement>, day: string) => void;
}

export const ProfileStep: React.FC<ProfileStepProps> = ({
  formData,
  errors,
  availableDays,
  updateFormData,
  handleAvailableDaysChange
}) => {
  const handleSkillsChange = (skills: string[]) => {
    updateFormData('skillsNeeds', skills.join(', '));
  };

  const selectedSkills = formData.skillsNeeds ? formData.skillsNeeds.split(', ').filter((s: string) => s.trim()) : [];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center">
        Complete seu Perfil
      </h2>

      <SelecaoTipoDeUserForm
        userType={formData.userType}
        updateFormData={updateFormData}
      />

      {formData.userType && (
        <SelecaoDeDiasDisponiveis
          userType={formData.userType}
          availableDays={availableDays}
          handleAvailableDaysChange={handleAvailableDaysChange}
        />
      )}

      {formData.userType && (
        <div className="space-y-8">
          <SelecaoDeSkill
            userType={formData.userType}
            selectedSkills={selectedSkills}
            onSkillChange={handleSkillsChange}
            error={errors.skillsNeeds}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fale um pouco sobre você
            </label>
            <textarea
              rows={4}
              placeholder="Conte um pouco sobre sua personalidade, hobbies, experiências..."
              value={formData.aboutYou}
              onChange={(e) => updateFormData('aboutYou', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};