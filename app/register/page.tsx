"use client";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthForm } from "../../components";

export default function RegisterPage(): JSX.Element {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const Submit = async (formData: FieldValues): Promise<void> => {
        setLoading(true);
        try {
            await axios.post("https://databaseandapi.azurewebsites.net/register", {
                UserName: formData.name,
                Password: formData["new-password"]
            });
            router.push("/login");
            reset();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data as string);
            }
        }
        setLoading(false);
    };
    return (
        <>
            <AuthForm variant={"register"} register={register} handleSubmit={handleSubmit}
                Submit={Submit} loading={loading} />
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />
        </>
    );
}
