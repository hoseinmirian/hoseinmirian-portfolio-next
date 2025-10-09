import { useState } from "react";

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

type UseContactFormOptions = {
  onSubmit: (values: ContactFormValues) => Promise<{
    success: boolean
  }>
}

export function useContactForm({ onSubmit }: UseContactFormOptions) {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setStatus("loading");
    try {
      await onSubmit(values);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return { values, status, handleChange, handleSubmit };
}