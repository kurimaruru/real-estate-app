import { z } from "zod";

export type Companies = { prefecture: string; companies: Company[] };

export type Company = {
  name: string;
  lines: {
    line: string;
    stations: {
      name: string;
      code: string;
    }[];
  }[];
};

export type Prefectures =
  | "tokyo"
  | "chiba"
  | "kanagawa"
  | "ibaragi"
  | "totigi"
  | "saitama"
  | "gunma";

export const searchFormSchema = z.object({
  area: z.string(),
  city: z.string().optional(),
  searchType: z.enum(["town", "station"]),
  layout: z.array(z.string()),
  builtYear: z.number().min(0).max(30),
  station: z.string(),
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;
