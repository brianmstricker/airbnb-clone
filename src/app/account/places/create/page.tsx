import InputWithLabel from "@/components/InputWithLabel";
import PerkInput from "./PerkInput";

const page = () => {
  return (
    <form className="max-w-4xl mx-auto">
      <h1 className="text-center text-xl mb-4">Add your place</h1>
      <div className="flex flex-col gap-3">
        <InputWithLabel name="Name" label="name" />
        <InputWithLabel name="Address" label="address" />
        <div className="lg:grid lg:grid-cols-[350px_272px_272px]">
          <div className="flex items-center justify-between lg:justify-normal gap-4">
            <label htmlFor="type" className="min-w-[85px] lg:min-w-fit">
              Type
            </label>
            <input
              type="text"
              id="type"
              className="border border-gray-300 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] lg:max-w-[250px] lg:ml-12"
              placeholder="Lake house, Mini house, etc."
            />
          </div>
          <div className="flex items-center justify-between lg:justify-normal gap-4">
            <label htmlFor="beds" className="min-w-[85px] lg:min-w-fit lg:ml-2">
              Beds
            </label>
            <input
              type="text"
              id="beds"
              className="border border-gray-300 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] "
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
              type="text"
              id="baths"
              className="border border-gray-300 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] "
            />
          </div>
        </div>
        <label htmlFor="description" className="-mb-1">
          Description
        </label>
        <textarea
          id="description"
          className="border border-gray-300 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Leave a description of your place"
          rows={5}
        />
        <h3 className="-mb-1">Perks</h3>
        <div className="border border-gray-300 px-4 py-2 rounded-md">
          <div className="grid grid-cols-3">
            <PerkInput name="Wifi" label="wifi" />
            <PerkInput name="Kitchen" label="kitchen" />
            <PerkInput name="Central AC" label="central AC" />
            <PerkInput name="Parking" label="parking" />
            <PerkInput name="Security Cameras" label="security" />
            <PerkInput name="Balcony" label="balcony" />
            <PerkInput name="Backyard" label="backyard" />
            <PerkInput name="Private Entrance" label="private " />
          </div>
        </div>
      </div>
    </form>
  );
};
export default page;
