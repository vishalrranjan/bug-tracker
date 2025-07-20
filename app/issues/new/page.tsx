"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { bugValidationSchema } from "@/ValidationSchemas/bugValidationSchema";
import { z } from "zod";
import ErrorMessage from "@/component/ErrorMessage";

// Dynamically import SimpleMdeReact for client-side only
const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type FormData = z.infer<typeof bugValidationSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bugValidationSchema),
  });
  const router = useRouter();

  const submitFormData: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/api/bug", data);
      router.push("/issues");
    } catch (error) {
      setError("Failed to create bug. Please try again.");
      console.error("Error creating bug:", error);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Icon>
            <CiWarning />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={handleSubmit(submitFormData)}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact {...field} placeholder="Description" />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit">Submit New Bug</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
