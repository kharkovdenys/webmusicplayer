import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthForm } from "../../components";
import { setCookie } from 'cookies-next';
import { useState } from "react";

export const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();
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
            const { data } = await axios.post("https://databaseandapi.azurewebsites.net/login", { UserName: formData.name, Password: formData["current-password"] });
            setCookie("token", data.token, { expires: getExpires() });
            navigate("/");
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
            <AuthForm variant={"login"} register={register} handleSubmit={handleSubmit}
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
};
