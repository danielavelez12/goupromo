import { useState } from "react";
import styled from "styled-components";
import AuthModal from "./AuthModal";
import Button from "./Button";
import { FormStack, StyledFormField } from "./StyledForm";
import { toaster } from "./ui/toaster";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
}

function AddItemModal({ isOpen, onClose, restaurantId }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    item_type: "",
    itemTypeOption: "bolsa_sorpresa",
    description: "",
    item_number: "",
    original_price: "",
    offer_price: "",
    quantity: "",
    start_time: "",
    end_time: "",
    image_url: "",
    unit_weight: "",
    delivery_included: false,
    delivery_fee: "0",
    status: "active",
  });
  const [touched, setTouched] = useState({
    item_type: false,
    description: false,
    item_number: false,
    original_price: false,
    offer_price: false,
    quantity: false,
    image_url: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        `${import.meta.env.VITE_API_BASE_URL}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            restaurant_id: restaurantId,
            original_price: parseInt(formData.original_price),
            offer_price: parseInt(formData.offer_price),
            quantity: parseInt(formData.quantity),
            unit_weight: parseInt(formData.unit_weight),
            delivery_fee: parseInt(formData.delivery_fee),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      toaster.create({
        title: "Éxito",
        description: "Artículo agregado exitosamente",
        type: "success",
      });

      onClose();
      window.location.reload();
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Error al agregar el artículo",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ restaurantId });

  return (
    <AuthModal
      isOpen={isOpen}
      onClose={onClose}
      title="Agregar nueva oferta"
      maxWidth="900px"
    >
      <form onSubmit={handleSubmit}>
        <FormStack alignItems="flex-start">
          <SectionTitle>Información basica</SectionTitle>
          <Stack>
            <RadioGroup>
              <StyledLabel>Tipo de artículo</StyledLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="itemTypeOption"
                  value="surprise_bag"
                  checked={formData.itemTypeOption === "surprise_bag"}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      itemTypeOption: e.target.value,
                      item_type: "bolsa_sorpresa",
                    }));
                  }}
                />
                Bolsa sorpresa
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="itemTypeOption"
                  value="food_plate"
                  checked={formData.itemTypeOption === "food_plate"}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      itemTypeOption: e.target.value,
                      item_type: "plato_de_comida",
                    }));
                  }}
                />
                Plato de comida
              </RadioLabel>
            </RadioGroup>

            <StyledFormField
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              isInvalid={touched.description && !formData.description}
            />

            <StyledFormField
              label="Número de artículo"
              name="item_number"
              value={formData.item_number}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              isInvalid={touched.item_number && !formData.item_number}
            />

            <StyledFormField
              label="URL de imagen"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Stack>

          <SectionTitle>Precio y cantidad</SectionTitle>
          <Stack>
            <StyledFormField
              label="Precio original"
              name="original_price"
              inputType="number"
              value={formData.original_price}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              isInvalid={touched.original_price && !formData.original_price}
            />

            <StyledFormField
              label="Precio de oferta"
              name="offer_price"
              inputType="number"
              value={formData.offer_price}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              isInvalid={touched.offer_price && !formData.offer_price}
            />

            <StyledFormField
              label="Cantidad"
              name="quantity"
              inputType="number"
              value={formData.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <StyledFormField
              label="Peso unitario (g)"
              name="unit_weight"
              inputType="number"
              value={formData.unit_weight}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <SectionTitle>Detalles de la oferta</SectionTitle>

            <StyledFormField
              label="Fecha de inicio"
              name="start_time"
              inputType="datetime-local"
              value={formData.start_time}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <StyledFormField
              label="Fecha de fin"
              name="end_time"
              inputType="datetime-local"
              value={formData.end_time}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <StyledLabel>Incluye entrega</StyledLabel>
            <RadioGroup>
              <RadioLabel>
                <input
                  type="radio"
                  name="delivery_included"
                  checked={formData.delivery_included}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      delivery_included: e.target.checked,
                    }))
                  }
                />
                Sí
              </RadioLabel>
              <RadioLabel>
                <input
                  type="radio"
                  name="delivery_included"
                  checked={!formData.delivery_included}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      delivery_included: false,
                    }))
                  }
                />
                No
              </RadioLabel>
            </RadioGroup>
            {formData.delivery_included && (
              <StyledFormField
                label="Costo de entrega"
                name="delivery_fee"
                inputType="number"
                value={formData.delivery_fee}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
          </Stack>

          <Button
            type="submit"
            customVariant="primary"
            size="lg"
            w="100%"
            loading={isLoading}
            my="1rem"
          >
            Publicar oferta
          </Button>
        </FormStack>
      </form>
    </AuthModal>
  );
}

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem 0;
  color: black;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: black;

  input[type="radio"] {
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin: 0;
    position: relative;

    &:checked {
      border-color: #0066cc;

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0.7rem;
        height: 0.7rem;
        background: #0066cc;
        border-radius: 50%;
      }
    }
  }
`;

const StyledLabel = styled.label`
  display: block;
  color: black;
  font-weight: bold;
  font-size: 0.9rem;
`;

export default AddItemModal;
