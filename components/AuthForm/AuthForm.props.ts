import { FieldValues, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface AuthFormProps {
    variant: "login" | "register";
    register: UseFormRegister<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    Submit: SubmitHandler<FieldValues>;
    loading: boolean;
}