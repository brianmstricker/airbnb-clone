import { z } from "zod";

export const placeSchema = z.object({
  name: z
    .string()
    .min(10, { message: "Name must be 10 or more characters." })
    .max(100, { message: "Name must be 100 or less characters." }),
  address: z.string().nonempty({ message: "Address is required." }),
  type: z
    .string()
    .max(25, { message: "Type must be 25 or less characters." })
    .nonempty({ message: "Type is required." }),
  // photos: z.array(z.string()),
  beds: z.number().int().positive(),
  baths: z.number().int().positive(),
  description: z
    .string()
    .min(25, { message: "Description must be over 25 characters." })
    .max(500, { message: "Description must be 500 or less characters." }),
  perks: z.array(z.string()),
  checkInTime: z.string().nonempty({ message: "Check in time is required." }),
  checkOutTime: z.string().nonempty({ message: "Check out time is required." }),
  price: z.string().nonempty({ message: "Price is required." }),
});
