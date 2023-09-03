"use client";
import InputWithLabel from "@/components/InputWithLabel";
import { useState } from "react";
import Perks from "./Perks";
import { placeSchema } from "@/utils/placeSchema";
import { z } from "zod";

const Page = () => {
  type form = z.infer<typeof placeSchema>;
  const [form, setForm] = useState({
    name: "",
    address: "",
    type: "",
    beds: "",
    baths: "",
    description: "",
    perks: [],
    checkIn: "",
    checkOut: "",
    price: "",
  } as any);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-center text-xl mb-4">Add your place</h1>
      <div className="flex flex-col gap-3">
        <InputWithLabel
          name="Name"
          label="name"
          placeholder="Enter a catchy name for your place"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <InputWithLabel
          name="Address"
          label="address"
          placeholder="Austin, Texas, United States"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <div className="lg:grid lg:grid-cols-[350px_272px_272px]">
          <div className="flex items-center justify-between lg:justify-normal gap-4">
            <label htmlFor="type" className="min-w-[85px] lg:min-w-fit">
              Type
            </label>
            <input
              type="text"
              id="type"
              className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] lg:max-w-[250px] lg:ml-12"
              placeholder="Lake house, Mini house, etc."
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between lg:justify-normal gap-4">
            <label htmlFor="beds" className="min-w-[85px] lg:min-w-fit lg:ml-2">
              Beds
            </label>
            <input
              type="number"
              id="beds"
              className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] "
              placeholder="1, 2, 3, etc."
              value={form.beds}
              onChange={(e) => setForm({ ...form, beds: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between lg:justify-normal gap-4">
            <label
              htmlFor="baths"
              className="min-w-[85px] lg:min-w-fit lg:ml-2"
            >
              Baths
            </label>
            <input
              type="number"
              id="baths"
              className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] "
              placeholder="1, 2, 3, etc."
              value={form.baths}
              onChange={(e) => setForm({ ...form, baths: e.target.value })}
            />
          </div>
        </div>
        <label htmlFor="description" className="-mb-1">
          Description
        </label>
        <textarea
          id="description"
          className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Leave a description of your place"
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <h3 className="-mb-1">Perks</h3>
        <div className="border border-gray-300 px-4 py-2 rounded-md">
          <Perks
            selected={form.perks}
            onChange={(perks: string[]) => setForm({ ...form, perks })}
          />
        </div>
        <h4>Things To Know</h4>
        <div className="border border-gray-300 px-4 py-2 rounded-md">
          <div className="xxs:grid xxs:grid-cols-2 gap-4">
            <div className="flex items-center justify-between lg:justify-normal gap-2">
              <label
                htmlFor="checkIn"
                className="min-w-[122px] lg:min-w-fit lg:ml-2"
              >
                Check in time
              </label>
              <input
                type="text"
                id="checkIn"
                className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] lg:ml-[20px]"
                placeholder="1:00 PM, 2:00 PM, etc."
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between lg:justify-normal gap-2">
              <label
                htmlFor="checkOut"
                className="min-w-[122px] lg:min-w-fit lg:ml-2"
              >
                Check out time
              </label>
              <input
                type="text"
                id="checkOut"
                className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px]"
                placeholder="11:00 AM, 12:00 PM, etc."
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between lg:justify-normal gap-2">
            <label
              htmlFor="price"
              className="min-w-[122px] lg:min-w-fit lg:ml-2"
            >
              Price (per night)
            </label>
            <input
              type="text"
              id="price"
              className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px]"
              placeholder="$100, $200, etc."
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-rose-400">
          Add place
        </button>
      </div>
    </form>
  );
};
export default Page;
