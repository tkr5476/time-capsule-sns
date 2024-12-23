import { useState } from "react";
import { useAuth } from "../auth/useAuth";

interface AuthFormData {
  email: string;
  password: string;
}

export const useAuthForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    return await login(formData.email, formData.password);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
