import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearAuthError } from "../actions/userActions";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData))
    }

    useEffect(() => {
        if (message) {
            toast(message, {
                type: 'success',
            })
            setEmail("");
            return;
        }

        if (error) {
            toast(error, {
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [message, error, dispatch])


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <form onSubmit={submitHandler} className="space-y-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">Forgot Password</h1>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email_field" className="text-sm font-medium text-gray-700">
                            Enter Email
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    )
}
