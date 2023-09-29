import { z } from "zod";

export enum PlaceEnum {
 TINY_HOME = "Tiny Home",
 CASTLE = "Castle",
 CABIN = "Cabin",
 WINDMILL = "Windmill",
 LAKEFRONT = "Lakefront",
 TREEHOUSE = "Treehouse",
 OFFGRID = "Off Grid",
 PLAY = "Play",
 BEACHFRONT = "Beachfront",
 LIGHTHOUSE = "Lighthouse",
 SKIING = "Skiing",
 CAMPING = "Camping",
 HOUSEBOAT = "Houseboat",
 EARTHHOME = "Earth Home",
 APARTMENT = "Apartment",
 HOUSE = "House",
}

export const placeSchema = z.object({
 name: z
  .string()
  .min(10, { message: "Name must be 10 or more characters." })
  .max(100, { message: "Name must be 100 or less characters." }),
 address: z.string().nonempty({ message: "Address is required." }),
 type: z.nativeEnum(PlaceEnum),
 photos: z.array(z.string()),
 beds: z.number().int().positive(),
 baths: z.number().int().positive(),
 description: z
  .string()
  .min(25, { message: "Description must be over 25 characters." })
  .max(500, { message: "Description must be 500 or less characters." }),
 perks: z.array(z.string()).optional(),
 checkInTime: z.string().nonempty({ message: "Check in time is required." }),
 checkOutTime: z.string().nonempty({ message: "Check out time is required." }),
 price: z.string().nonempty({ message: "Price is required." }),
});
