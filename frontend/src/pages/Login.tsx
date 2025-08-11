import React from "react";
import { PageLayout } from "../components/PageLayout";
import { LoginForm } from "../components/LoginForm";
import { LoginFooter } from "../components";
import { useLoginForm } from "../hooks/useLoginForm";

const Login: React.FC = () => {
  const { formData, errors, isLoading, updateFormData, handleSubmit } =
    useLoginForm();

  return (
    <PageLayout>
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text mb-4">
            Fazer Login
          </h1>
        </div>
        <div className="glass-card p-8">
          <LoginForm
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            onUpdateFormData={updateFormData}
            onSubmit={handleSubmit}
          />

          <div className="mt-6 space-y-4">
            <LoginFooter />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
