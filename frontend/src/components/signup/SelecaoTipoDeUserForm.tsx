import React from "react";

interface SelecaoTipoDeUserFormProps {
  userType: string;
  updateFormData: (field: string, value: string) => void;
}

export const SelecaoTipoDeUserForm: React.FC<SelecaoTipoDeUserFormProps> = ({
  userType,
  updateFormData
}) => {
  const userTypes = [
    {
      value: 'ajudado',
      icon: '🤝',
      title: 'Preciso de Ajuda',
      description: 'Sou uma pessoa mais velha que precisa de apoio em algumas atividades',
      colorClass: 'primary'
    },
    {
      value: 'ajudante',
      icon: '❤️',
      title: 'Quero Ajudar',
      description: 'Sou uma pessoa jovem que quer ajudar e aprender com os mais experientes',
      colorClass: 'secondary'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-accent-700 text-center">
        Como você gostaria de participar?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTypes.map((type) => (
          <div
            key={type.value}
            onClick={() => updateFormData('userType', type.value)}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
              userType === type.value
                ? `border-${type.colorClass}-500 bg-${type.colorClass}-50 shadow-lg`
                : 'border-accent-200 hover:border-primary-200'
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 bg-${type.colorClass}-100 rounded-full flex items-center justify-center`}>
                <span className="text-2xl">{type.icon}</span>
              </div>
              <h4 className="text-xl font-semibold text-accent-800 mb-2">
                {type.title}
              </h4>
              <p className="text-accent-600">
                {type.description}
              </p>
              <input
                type="radio"
                name="userType"
                value={type.value}
                checked={userType === type.value}
                onChange={() => updateFormData('userType', type.value)}
                className={`mt-4 w-5 h-5 text-${type.colorClass}-600`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};