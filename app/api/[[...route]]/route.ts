import { filterSearchResult } from "@/utils/api/filterSearchResult";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { headers } from "next/headers";

export const runtime = "edge";

const app = new Hono().basePath("/api");

interface QueryParams {
  year?: string;
  builtYear?: string;
  area?: string;
  city?: string;
  station?: string;
  priceClassification?: string;
  layout?: string;
}

app.get("/search", async (c) => {
  const year = c.req.query("year");
  const query: QueryParams = {
    year,
    area: c.req.query("area"),
    station: c.req.query("station"),
    city: c.req.query("city"),
  };

  // 不要なundefinedのパラメータを削除
  Object.keys(query).forEach((key) => {
    if (query[key as keyof QueryParams] === undefined) {
      delete query[key as keyof QueryParams];
    }
  });

  const headers = {
    "Ocp-Apim-Subscription-Key": process.env.API_KEY as string,
  };

  try {
    const queryString = new URLSearchParams(
      query as Record<string, string>
    ).toString();
    const url = `${process.env.API_URL}?${queryString}`;

    console.log("###", headers);
    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const jsonData = await response.json();
    console.log("★★★★★★", jsonData);

    const filteredData = filterSearchResult(
      year ?? "",
      0,
      Number(c.req.query("builtYear")),
      // c.req.query("layout"),
      ["１ＬＤＫ"],
      jsonData.data
    );

    return c.json(filteredData);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "An unknown error occurred" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
