'use client';

import React from "react";
import { useContactForm } from '@/features/contact/hooks';
import { createContact } from "@/features/contact/actions";

export default function ContactForm() {
  const { values, status, handleChange, handleSubmit } = useContactForm({
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => formData.append(k, v));
      return createContact(formData);
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 max-w-md mx-auto p-4 border rounded-lg"
    >
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Your name"
        className="border p-2 rounded"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Your email"
        className="border p-2 rounded"
      />
      <textarea
        name="message"
        value={values.message}
        onChange={handleChange}
        placeholder="Your message"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 text-white py-2 rounded"
      >
        {status === "loading" ? "Sending..." : "Send"}
      </button>
      {status === "success" && (
        <p className="text-green-600">Message sent successfully!</p>
      )}
      {status === "error" && <p className="text-red-600">Failed to send.</p>}
    </form>
  );
}
