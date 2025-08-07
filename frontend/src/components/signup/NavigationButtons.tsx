import React from "react";

interface NavigationButtonsProps {
  currentStep: number;
  isLoading: boolean;
  setCurrentStep: (step: number) => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  isLoading,
  setCurrentStep
}) => {
  return (
    <div className="flex justify-between items-center pt-8 border-t border-accent-200">
      <button
        type="button"
        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
        disabled={currentStep === 1}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
          currentStep === 1
            ? 'bg-accent-100 text-accent-400 cursor-not-allowed'
            : 'bg-accent-200 text-accent-700 hover:bg-accent-300 hover:shadow-md'
        }`}
      >
        Anterior
      </button>

      <div className="flex space-x-4">
        {currentStep < 3 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
            className="btn-primary"
          >
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-primary flex items-center space-x-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>{isLoading ? 'Finalizando...' : 'Finalizar Cadastro'}</span>
          </button>
        )}
      </div>
    </div>
  );
};