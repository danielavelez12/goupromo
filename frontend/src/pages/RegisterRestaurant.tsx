import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import Button from "../components/Button";
import { StyledFormField } from "../components/StyledForm";
import { toaster } from "../components/ui/toaster";

interface RestaurantSignupProps {
  isOpen: boolean;
  onClose: () => void;
}

function RestaurantSignup({ isOpen, onClose }: RestaurantSignupProps) {
  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    address: "",
    contact_person: "",
    phone: "",
    email: "",
    city: "",
    plan: "goupromo",
    user_type: "restaurant",
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
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/restaurant/signup`,
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
        title: "Restaurant registered successfully",
        type: "success",
        duration: 3000,
      });

      onClose();
      navigate("/login");
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error.message,
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear cuenta de restaurante"
    >
      <form onSubmit={handleSubmit}>
        <VStack spaceY={4} alignItems="left" justifyContent="left">
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
            label="Persona de Contacto"
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
        </VStack>
        <Button
          type="submit"
          customVariant="primary"
          size="lg"
          w="100%"
          loading={isLoading}
          mt={8}
        >
          Registrar
        </Button>
      </form>
    </AuthModal>
  );
}

export default RestaurantSignup;
