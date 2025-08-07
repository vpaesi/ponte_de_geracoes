import React from "react";
import { FormField } from "../form/FormField";
import { handleCepBlur } from "../../utils/ValidadeCep";
import { formatCEP } from "../../utils/formatters";

interface EnderecoFormProps {
  formData: any;
  errors: Record<string, boolean>;
  updateFormData: (field: string, value: string) => void;
}

export const EnderecoForm: React.FC<EnderecoFormProps> = ({
  formData,
  errors,
  updateFormData
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center">
        Endereço
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            CEP <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            placeholder="00000-000"
            value={formData.zipCode}
            onChange={(e) => updateFormData('zipCode', formatCEP(e.target.value))}
            onBlur={() =>
              handleCepBlur(
                formData.zipCode,
                (value) => updateFormData('street', value),
                (value) => updateFormData('city', value),
                (value) => updateFormData('neighborhood', value)
              )
            }
            maxLength={9}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
              errors.zipCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.zipCode && (
            <div className="ml-4 mt-1">
              <p className="text-red-600 text-sm">CEP é obrigatório</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Cidade <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite sua cidade"
            value={formData.city}
            readOnly
            className={`w-full px-4 py-3 border rounded-lg bg-accent-50 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.city && (
            <div className="ml-4 mt-1">
              <p className="text-red-600 text-sm">Cidade é obrigatória</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Bairro <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Digite seu bairro"
            value={formData.neighborhood}
            readOnly
            className={`w-full px-4 py-3 border rounded-lg bg-accent-50 ${
              errors.neighborhood ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.neighborhood && (
            <div className="ml-4 mt-1">
              <p className="text-red-600 text-sm">Bairro é obrigatório</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Logradouro <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Avenida Exemplo de Rua"
            value={formData.street}
            readOnly
            className={`w-full px-4 py-3 border rounded-lg bg-accent-50 ${
              errors.street ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.street && (
            <div className="ml-4 mt-1">
              <p className="text-red-600 text-sm">Logradouro é obrigatório</p>
            </div>
          )}
        </div>

        <FormField
          label="Número"
          type="text"
          placeholder="123"
          value={formData.number}
          onChange={(value) => updateFormData('number', value)}
          error={errors.number ? "Número é obrigatório" : undefined}
          required
        />

        <FormField
          label="Complemento"
          type="text"
          placeholder="Apto 101, Casa 2..."
          value={formData.complement}
          onChange={(value) => updateFormData('complement', value)}
        />
      </div>
    </div>
  );
};