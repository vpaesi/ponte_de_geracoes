import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormValues } from '../types';
import { registrationService } from '../services/registrationService';
import { validateFields } from '../utils/validate-fields/ValidateFields';

export const useRegistrationForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    rg: "",
    cpf: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    street: "",
    number: "",
    zipCode: "",
    city: "",
    neighborhood: "",
    complement: "",
    userType: "",
    aboutYou: "",
    skillsNeeds: "",
    availableDays: [] as string[],
  });

  const [profileImagePreview, setProfileImagePreview] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleAvailableDaysChange = (day: string, checked: boolean) => {
    const updatedDays = checked
      ? [...formData.availableDays, day]
      : formData.availableDays.filter(d => d !== day);
    
    updateField('availableDays', updatedDays);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    const formValues: FormValues = {
      ...formData,
      dob: formData.birthDate,
      address: {
        street: formData.street,
        number: formData.number,
        complement: formData.complement,
        zipCode: formData.zipCode,
        city: formData.city,
        neighborhood: formData.neighborhood,
      },
      ...(formData.userType === "ajudante"
        ? { skills: formData.skillsNeeds }
        : { needs: formData.skillsNeeds }),
    };

    if (!validateFields(formValues, setErrors)) return;

    try {
      setIsSubmitting(true);
      const createdUser = await registrationService.registerUser(formValues);
      
      if (profileImagePreview && createdUser.id) {
        await registrationService.uploadProfileImage(
          formData.userType,
          createdUser.id,
          profileImagePreview
        );
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/users");
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Ocorreu um erro ao realizar o cadastro.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    profileImagePreview,
    errors,
    isSubmitting,
    updateField,
    setProfileImagePreview,
    handleAvailableDaysChange,
    handleSubmit,
  };
};
