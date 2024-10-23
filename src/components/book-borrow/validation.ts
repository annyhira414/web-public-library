import * as z from "zod";

export const addNewAddressSchema = z
  .object({
    lineItems: z.array(
      z.object({
        availavleLibraryForBook: z.number({
          required_error: "Please select library",
        }),
      })
    ),

    addNewAddress: z.boolean(),
    name: z
      .string({
        required_error: "Name is require",
        invalid_type_error: "Name is require",
      })
      .min(1, { message: "Name is required" }),
    phone: z
      .string({
        required_error: "Phone is require",
        invalid_type_error: "Phone is require",
      })
      .min(1, { message: "Phone is required" }),

    divisions: z.number({
      required_error: "Divisions is require",
      invalid_type_error: "Divisions is require",
    }),

    districts: z.number({
      required_error: "Districts is require",
      invalid_type_error: "Districts is require",
    }),

    thanas: z.number({
      required_error: "Thana is require",
      invalid_type_error: "Thana is require",
    }),
    addressLine: z
      .string({
        required_error: "Address line is require",
        invalid_type_error: "Address line is require",
      })
      .min(1, { message: "Address line" }),
    isSaveAddress: z.boolean().optional(),

    addressTitle: z.string().optional(),
  })
  .refine(
    (data: any) => {
      if (data?.isSaveAddress && data?.addressTitle === "") {
        return false;
      } else {
        return true;
      }
    },
    {
      message: "required",
      path: ["addressTitle"],
    }
  );

export const addNewAddressSchemaWithoutLineItems = z
  .object({
    lineItems: z
      .array(
        z.object({
          availavleLibraryForBook: z
            .number({
              required_error: "Please select library",
            })
            .optional(),
        })
      )
      .optional(),

    addNewAddress: z.boolean(),
    name: z
      .string({
        required_error: "Name is require",
        invalid_type_error: "Name is require",
      })
      .min(1, { message: "Name is required" }),
    phone: z
      .string({
        required_error: "Phone is require",
        invalid_type_error: "Phone is require",
      })
      .min(1, { message: "Phone is required" }),

    divisions: z.number({
      required_error: "Divisions is require",
      invalid_type_error: "Divisions is require",
    }),

    districts: z.number({
      required_error: "Districts is require",
      invalid_type_error: "Districts is require",
    }),

    thanas: z.number({
      required_error: "Thana is require",
      invalid_type_error: "Thana is require",
    }),
    addressLine: z
      .string({
        required_error: "Address line is require",
        invalid_type_error: "Address line is require",
      })
      .min(1, { message: "Address line" }),
    isSaveAddress: z.boolean().optional(),

    addressTitle: z.string().optional(),
  })
  .refine(
    (data: any) => {
      if (data?.isSaveAddress && data?.addressTitle === "") {
        return false;
      } else {
        return true;
      }
    },
    {
      message: "required",
      path: ["addressTitle"],
    }
  );

export const savedAddressSchema = z.object({
  delivery: z
    .string()
    .refine((value) => ["pickup", "delivery"].includes(value), {
      message: "Delivery must be 'pickup' or 'delivery'",
    }),
  lineItems: z.array(
    z.object({
      availavleLibraryForBook: z.number({
        required_error: "Please select library",
      }),
    })
  ),
  selectAddress: z
    .number({
      required_error: "Address is required",
      invalid_type_error: "Address is required",
    })
    .optional()
    .refine(
      (data: any) => {
        if (!data?.addNewAddress) {
          return true;
        }
        return false;
      },
      {
        message: "Select Address is required if 'addNewAddress' is false",
        path: ["selectAddress"],
      }
    ),
  addNewAddress: z.boolean(),
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
});

export const savedAddressSchemaWithoutLineItems = z.object({
  delivery: z
    .string()
    .refine((value) => ["pickup", "delivery"].includes(value), {
      message: "Delivery must be 'pickup' or 'delivery'",
    }),
  lineItems: z
    .array(
      z.object({
        availavleLibraryForBook: z
          .number({
            required_error: "Please select library",
          })
          .optional(),
      })
    )
    .optional(),
  selectAddress: z
    .number({
      required_error: "Address is required",
      invalid_type_error: "Address is required",
    })
    .optional()
    .refine(
      (data: any) => {
        if (!data?.addNewAddress) {
          return true;
        }
        return false;
      },
      {
        message: "Select Address is required if 'addNewAddress' is false",
        path: ["selectAddress"],
      }
    ),
  addNewAddress: z.boolean(),
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
});
