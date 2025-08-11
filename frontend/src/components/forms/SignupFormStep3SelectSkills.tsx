import React from "react";
import { SKILLS_OPTIONS, NEEDS_OPTIONS } from "../../constants/skills";

interface SignupFormStep3SelectSkillsProps {
  userType: string;
  selectedSkills: string[];
  onSkillChange: (skills: string[]) => void;
  error?: boolean;
}

export const SignupFormStep3SelectSkills: React.FC<
  SignupFormStep3SelectSkillsProps
> = ({ userType, selectedSkills, onSkillChange, error }) => {
  const options = userType === "ajudante" ? SKILLS_OPTIONS : NEEDS_OPTIONS;
  const label =
    userType === "ajudante" ? "Suas Habilidades" : "Suas Necessidades";

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onSkillChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg max-h-60 overflow-y-auto">
        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer p-3 rounded-lg border text-sm text-center transition-all duration-300 hover:shadow-md ${
              selectedSkills.includes(option)
                ? "border-primary-500 bg-primary-500 text-white bg-[#e76f51]"
                : "border-accent-200 bg-white text-accent-600 hover:border-primary-200"
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedSkills.includes(option)}
              onChange={() => handleSkillToggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
      {error && (
        <div className="ml-4 mt-1">
          <p className="text-red-600 text-sm">Selecione pelo menos uma opção</p>
        </div>
      )}
    </div>
  );
};
