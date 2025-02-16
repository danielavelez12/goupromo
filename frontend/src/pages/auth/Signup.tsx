import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../../components/AuthModal";
import {
  FormStack,
  StyledFormField,
  SubmitButton,
} from "../../components/StyledForm";
import { toaster } from "../../components/ui/toaster";

interface SignupProps {
  isOpen: boolean;
  onClose: () => void;
}

function Signup({ isOpen, onClose }: SignupProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    city: "",
    user_type: "customer",
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    city: false,
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/signup`,
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
        throw new Error(data.detail || "Error signing up");
      }

      toaster.create({
        title: "Account created successfully",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error.message,
        variant: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title="Registro">
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

          <StyledFormField
            label="Nombre"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.first_name && !formData.first_name}
          />

          <StyledFormField
            label="Apellido"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.last_name && !formData.last_name}
          />

          <StyledFormField
            label="Email"
            inputType="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.email && !formData.email}
          />

          <StyledFormField
            label="Teléfono"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.phone_number && !formData.phone_number}
          />

          <StyledFormField
            label="Ciudad"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.city && !formData.city}
          />

          <SubmitButton
            type="submit"
            colorScheme="brand"
            size="lg"
            loading={isLoading}
          >
            Crear cuenta
          </SubmitButton>
        </FormStack>
      </form>
      )
    </AuthModal>
  );
}

export default Signup;
