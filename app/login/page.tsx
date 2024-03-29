"use client";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthForm } from "../../components";
import { setCookie } from 'cookies-next';
import { useState } from "react";

export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const getExpires = (): Date => {
        const today = new Date();
        const expires = new Date();
        expires.setDate(today.getDate() + 365);
        return expires;
    };
    const Submit = async (formData: FieldValues): Promise<void> => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_DATABASE_API}/login`, {
                UserName: formData.name,
                Password: formData["current-password"]
            });
            setCookie("token", data.token, { expires: getExpires() });
            router.push("/");
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
            <AuthForm variant="login" register={register} handleSubmit={handleSubmit} Submit={Submit} loading={loading} />
            <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover />
        </>
    );
}