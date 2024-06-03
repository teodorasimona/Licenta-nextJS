"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          "service_riids4y",
          "template_16s5pql",
          form.current,
          "FQUyGnGbl8sOYjQBK"
        )
        .then(
          () => {
            console.log("message sent!");
            form.current?.reset();
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <div className="pt-20 h-full md:h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-50 rounded-lg shadow">
        <div className="p-6 md:p-12 w-full md:w-1/2">
          <form ref={form} onSubmit={sendEmail} className="space-y-3">
            <h1 className="text-2xl font-bold text-center mb-4">
              Contacteaza-ne
            </h1>
            <label htmlFor="user_name" className="font-bold">
              Name
            </label>
            <input
              id="user_name"
              type="text"
              name="user_name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <label htmlFor="user_email" className="font-bold">
              Email
            </label>
            <input
              id="user_email"
              type="email"
              name="user_email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <label htmlFor="message" className="font-bold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="submit"
              value="Send"
              className="mt-4 w-full p-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-700"
            />
          </form>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <img
            src="./images/contact-page-ilustratie.png"
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
