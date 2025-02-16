import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Button from "./Button";

// Styled components
export const StyledInput = styled(Input)`
  border: 0;
  background-color: #f7f7f7; // lightGray
  &:focus {
    ring-color: teal;
  }
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

export const StyledFormLabel = styled(FormLabel)`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const FormStack = styled(VStack)`
  width: 100%;
  gap: 1rem;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
`;

export const ERROR_MESSAGE = "Este campo es requerido";

interface StyledFormFieldProps {
  label: string;
  inputType?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
}

export const StyledFormField = ({
  label,
  inputType = "text",
  name,
  value,
  onChange,
  onBlur,
  isRequired = false,
  isInvalid = false,
}: StyledFormFieldProps) => {
  return (
    <StyledFormControl isRequired={isRequired} isInvalid={isInvalid}>
      <StyledFormLabel>{label}</StyledFormLabel>
      <StyledInput
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isInvalid && (
        <FormErrorMessage fontSize={12} color="red">
          {ERROR_MESSAGE}
        </FormErrorMessage>
      )}
    </StyledFormControl>
  );
};
