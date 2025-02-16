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
  language: z.string(),
  searchType: z.enum(["town", "station"]),
  line: z.string().optional(),
  layout: z.array(z.string()),
  builtYear: z.number().min(0).max(30),
  stationCode: z.string(),
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;
