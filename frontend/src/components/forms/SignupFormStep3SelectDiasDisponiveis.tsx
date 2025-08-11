import React from "react";

interface SignupFormStep3SelectDiasDisponiveisProps {
  userType: string;
  availableDays: string[];
  handleAvailableDaysChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => void;
}

export const SignupFormStep3SelectDiasDisponiveis: React.FC<
  SignupFormStep3SelectDiasDisponiveisProps
> = ({ userType, availableDays, handleAvailableDaysChange }) => {
  const days = [
    { key: "Domingo", label: "Dom" },
    { key: "Segunda", label: "Seg" },
    { key: "Terça", label: "Ter" },
    { key: "Quarta", label: "Qua" },
    { key: "Quinta", label: "Qui" },
    { key: "Sexta", label: "Sex" },
    { key: "Sábado", label: "Sáb" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-accent-700 text-center">
        {userType === "ajudante"
          ? "Quando você está disponível para ajudar?"
          : "Quando você precisaria de ajuda?"}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {days.map((day) => (
          <label
            key={day.key}
            className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all duration-300 hover:shadow-md ${
              availableDays.includes(day.key)
                ? "border-primary-500 bg-[#e76f51] text-white shadow-lg"
                : "border-accent-200 bg-white text-accent-600 hover:border-primary-200"
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={availableDays.includes(day.key)}
              onChange={(e) => handleAvailableDaysChange(e, day.key)}
            />
            <div className="font-medium text-sm">{day.label}</div>
          </label>
        ))}
      </div>
    </div>
  );
};
