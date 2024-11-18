import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
    const [result, setResult] = useState("");

    
    const validateForm = (formData) => {
        const errors = {};

        const name = formData.get("name")?.trim();
        const email = formData.get("email")?.trim();
        const message = formData.get("message")?.trim();

        if (!name || name.length < 2) {
            errors.name = "Name must be at least 2 characters.";
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!message || message.length < 10) {
            errors.message = "Message must be at least 10 characters.";
        }

        return errors;
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");

        const formData = new FormData(event.target);
        formData.append("access_key", import.meta.env.VITE_API_KEY);

        
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setResult("");
            Object.values(errors).forEach((error) => toast.error(error));
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setResult("");
                toast.success("Form submitted successfully!");
                event.target.reset();
            } else {
                toast.error(data.message);
                setResult("");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again later.");
            setResult("");
        }
    };

    return (
        <div className="text-center p-6 py-20 lg:px-32 w-full overflow-hidden" id="Contact">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
                Contact <span className="underline underline-offset-4 decoration-1 font-light">With Us</span>
            </h1>
            <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
                Ready to Make a Move? Let's Build Your Future Together
            </p>

            <form className="max-w-2xl mx-auto text-gray-600 pt-8" onSubmit={onSubmit}>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 text-left">
                        <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
                        <input
                            id="name"
                            className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                        />
                    </div>
                    <div className="w-full md:w-1/2 text-left md:pl-4">
                        <label htmlFor="email" className="block text-sm font-medium">Your Email</label>
                        <input
                            id="email"
                            className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                        />
                    </div>
                </div>
                <div className="my-6 text-left">
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <textarea
                        id="message"
                        className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none"
                        name="message"
                        placeholder="Message"
                        required
                    ></textarea>
                </div>
                <button
                    className="bg-blue-600 text-white py-2 px-12 mb-10 rounded"
                    type="submit"
                    disabled={result === "Sending..."}
                >
                    {result ? result : "Send Message"}
                </button>
            </form>
        </div>
    );
};

export default Contact;
