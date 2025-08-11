import React from "react";

interface IndicativoDePaginasProps {
  currentStep: number;
}

export const IndicativoDePaginas: React.FC<IndicativoDePaginasProps> = ({
  currentStep,
}) => {
  const steps = [{ number: 1 }, { number: 2 }, { number: 3 }];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                step.number <= currentStep
                  ? "bg-[#e76f51] text-white shadow-lg"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-2 transition-all duration-300 ${
                  step.number < currentStep ? "bg-[#e76f51]" : "bg-red-100"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
