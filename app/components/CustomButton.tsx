"use client";
import { NextPage } from "next";
import React from "react";
import { useFormStatus } from "react-dom";
interface ButtonProps {
  title: string;
}
const CustomButton: NextPage<ButtonProps> = ({ title }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`ml-6  text-white ${
        title === "Delete" ? "bg-red-500" : "bg-green-500"
      } ${title === "Submit" ? "mt-2" : "mt-0"} rounded-lg p-2`}
      type="submit"
    >
      {pending ? title + "ing..." : title}
    </button>
  );
};

export default CustomButton;
