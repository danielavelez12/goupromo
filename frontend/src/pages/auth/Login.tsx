import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../components/AuthModal";
import {
  FormStack,
  StyledFormField,
  SubmitButton,
} from "../../components/StyledForm";
import { toaster } from "../../components/ui/toaster";
import { useAuth } from "../../context/AuthContext";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

function Login({ isOpen, onClose }: LoginProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any required field is empty
    const requiredFields = ["username", "password"];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (emptyFields.length > 0) {
      setError("Por favor complete todos los campos requeridos");
      // Mark all empty fields as touched to show validation errors
      setTouched((prev) => ({
        ...prev,
        ...Object.fromEntries(emptyFields.map((field) => [field, true])),
      }));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Error logging in");
      }

      login(data.access_token, {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        city: data.city,
        user_type: data.user_type,
        id: data.id,
      });

      toaster.create({
        title: "Login successful",
        type: "success",
        duration: 3000,
      });

      onClose();
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      toaster.create({
        title: "Error",
        description: errorMessage,
        type: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title="Iniciar sesión">
      <form onSubmit={handleSubmit}>
        <FormStack>
          <StyledFormField
            label="Usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.username && !formData.username}
          />

          <StyledFormField
            label="Contraseña"
            inputType="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.password && !formData.password}
          />

          <SubmitButton
            type="submit"
            colorScheme="brand"
            size="lg"
            loading={isLoading}
          >
            Ingresar
          </SubmitButton>

          {error && (
            <div
              style={{ color: "red", textAlign: "center", marginTop: "0.5rem" }}
            >
              {error}
            </div>
          )}
        </FormStack>
      </form>
    </AuthModal>
  );
}

export default Login;
