"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  hobbies: string;
}

const PersonForm = ({ adding, data }: any) => {
  const [formData, setFormData] = useState<FormData>({
    name: data?.name || "",
    phone: data?.phone || "",
    email: data?.email || "",
    hobbies: data?.hobbies || "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (adding) {
      try {
        const response = await fetch("/api/people", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Reset form after successful submission
          setFormData({
            name: "",
            phone: "",
            email: "",
            hobbies: "",
          });
          alert("Person added successfully!");
        } else {
          alert("Failed to send message. Please try again later.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      try {
        const response = await fetch("/api/people", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Person updated successfully!");
        } else {
          alert("Failed to update message. Please try again later.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <>
      <div className="items-center flex justify-center w-full flex-col md:max-w-[40vw] mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-loose tracking-tight sm:text-4xl">
            {adding ? "Add Person details" : "Update Person details"}
          </h2>
        </div>

        <section className="w-full mt-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div className="sm:col-span-2">
              <Label
                htmlFor="name"
                className="block text-sm font-medium leading-5"
              >
                Name
                <div className="mt-1 rounded-md shadow-sm">
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    required={true}
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-md shadow-sm  "
                  />
                </div>
              </Label>
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="phone"
                className="block text-sm font-medium leading-5"
              >
                Phone
                <div className="mt-1 rounded-md shadow-sm">
                  <Input
                    id="phone"
                    type="text"
                    name="phone"
                    required={true}
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-md shadow-sm  "
                  />
                </div>
              </Label>
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="email"
                className="block text-sm font-medium leading-5 w-full"
              >
                Email
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required={true}
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 mt-1 rounded-md shadow-sm "
                />
              </Label>
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="hobbies"
                className="block text-sm font-medium leading-5"
              >
                Hobbies
                <Textarea
                  id="hobbies"
                  name="hobbies"
                  rows={4}
                  required={true}
                  value={formData.hobbies}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 mt-1 shadow-sm"
                />
              </Label>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full font-semibold">
                {adding ? "Add" : "Update"} Details
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default PersonForm;
