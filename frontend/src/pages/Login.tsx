import React from "react";
import { PageLayout } from "../components/PageLayout";
import { LoginForm } from "../components/login/LoginForm";
import { LoginFooter } from "../components/login/LoginFooter";
import { useLoginForm } from "../hooks/useLoginForm";

const Login: React.FC = () => {
  const { formData, errors, isLoading, updateFormData, handleSubmit } =
    useLoginForm();

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white py-5 px-2 sm:rounded-lg shadow-md">
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
              <LoginFooter
              />
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
