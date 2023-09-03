import { z } from "zod";

export const placeSchema = z.object({
  name: z
    .string()
    .min(10, { message: "Must be 10 or more characters." })
    .max(100, { message: "Must be 100 or less characters." }),
  address: z.string(),
  type: z.string().max(20, { message: "Must be 20 or less characters." }),
  photos: z.array(z.string()),
  beds: z.number().int().positive(),
  baths: z.number().int().positive(),
  description: z
    .string()
    .min(25, { message: "Must be over 25 characters." })
    .max(500, { message: "Must be 500 or less characters." }),
  perks: z.array(z.string()),
  thingsToKnow: z
    .string()
    .max(500, { message: "Must be 500 or less characters." }),
  checkInTime: z.string(),
  checkOutTime: z.string(),
  price: z.string(),
});
