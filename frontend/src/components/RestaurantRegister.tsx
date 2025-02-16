import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import Button from "./Button";
import { FormStack, StyledFormField } from "./StyledForm";
import { toaster } from "./ui/toaster";

interface RestaurantRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

function RestaurantRegister({ isOpen, onClose }: RestaurantRegisterProps) {
  const { user } = useAuth();
  console.log(user);
  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    address: "",
    contact_person: "",
    phone: "",
    email: "",
    city: "",
    plan: "goupromo",
  });
  const [touched, setTouched] = useState({
    name: false,
    nit: false,
    address: false,
    contact_person: false,
    phone: false,
    email: false,
    city: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    if (!user) {
      toaster.create({
        title: "Error",
        description: "Debes iniciar sesión primero",
        variant: "error",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/restaurant/register/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Error registering restaurant");
      }

      toaster.create({
        title: "¡Registro exitoso!",
        description: "Tu restaurante ha sido registrado correctamente",
        variant: "success",
        duration: 3000,
      });

      onClose();
      navigate("/dashboard");
    } catch (error) {
      toaster.create({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error desconocido",
        variant: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal isOpen={isOpen} onClose={onClose} title="Registrar restaurante">
      <form onSubmit={handleSubmit}>
        <FormStack>
          <StyledFormField
            label="Nombre del restaurante"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.name && !formData.name}
          />

          <StyledFormField
            label="Dirección"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.address && !formData.address}
          />

          <StyledFormField
            label="Nombre de persona de contacto"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.contact_person && !formData.contact_person}
          />

          <StyledFormField
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.phone && !formData.phone}
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
            label="Ciudad"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            isRequired
            isInvalid={touched.city && !formData.city}
          />

          <Button
            type="submit"
            customVariant="primary"
            size="lg"
            w="100%"
            loading={isLoading}
            mt={8}
          >
            Registrar restaurante
          </Button>
        </FormStack>
      </form>
    </AuthModal>
  );
}

export default RestaurantRegister;
