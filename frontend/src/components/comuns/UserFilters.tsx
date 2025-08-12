import React from "react";
import FilterSelect from "./FilterSelect";
import {
  USER_TYPES,
  USER_TYPE_LABELS,
  USER_TYPE_DESCRIPTIONS,
} from "../../constants/userTypes";

interface UserFiltersProps {
  selectedUserType: string;
  onUserTypeChange: (type: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  cities: string[];
  className?: string;
  showAllUsersOption?: boolean;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  selectedUserType,
  onUserTypeChange,
  selectedCity,
  onCityChange,
  cities,
  className = "",
  showAllUsersOption = true,
}) => {
  const userTypeOptions = [];

  if (showAllUsersOption) {
    userTypeOptions.push({
      value: USER_TYPES.ALL,
      label: USER_TYPE_LABELS[USER_TYPES.ALL],
      description: USER_TYPE_DESCRIPTIONS[USER_TYPES.ALL],
    });
  }

  userTypeOptions.push(
    {
      value: USER_TYPES.HELPER,
      label: USER_TYPE_LABELS[USER_TYPES.HELPER],
      description: USER_TYPE_DESCRIPTIONS[USER_TYPES.HELPER],
    },
    {
      value: USER_TYPES.ASSISTED,
      label: USER_TYPE_LABELS[USER_TYPES.ASSISTED],
      description: USER_TYPE_DESCRIPTIONS[USER_TYPES.ASSISTED],
    }
  );

  const cityOptions = cities.map((city) => ({
    value: city,
    label: city,
    description: `Usuários localizados em ${city}`,
  }));

  return (
    <div className={`glass-card p-2 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Filtros de Busca
        </h3>
        <p className="text-sm text-gray-600">
          Use os filtros abaixo para encontrar pessoas na sua região
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FilterSelect
          label="Tipo de usuário"
          value={selectedUserType}
          onChange={onUserTypeChange}
          options={userTypeOptions}
          placeholder=""
          required={false}
        />

        <FilterSelect
          label="Cidade"
          value={selectedCity}
          onChange={onCityChange}
          options={cityOptions}
          placeholder="Todas as cidades"
        />
      </div>
    </div>
  );
};

export default UserFilters;
