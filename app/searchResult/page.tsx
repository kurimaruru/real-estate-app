"use client";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { use, useEffect } from "react";

export default function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);
  useEffect(() => {
    const fetcher = async () => {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (typeof value === "string") {
          queryParams.append(key, value);
        }
      });

      const res = await fetch(`/api/search?${queryParams.toString()}`);
      const result = await res.json();
      console.log(result);
    };
    fetcher();
  }, [params]);
  const priceData = [
    { month: "2023-01", price: 35000000, transactions: 120 },
    { month: "2023-02", price: 36500000, transactions: 115 },
    { month: "2023-03", price: 35800000, transactions: 125 },
    { month: "2023-04", price: 37200000, transactions: 118 },
    { month: "2023-05", price: 38100000, transactions: 130 },
    { month: "2023-06", price: 38500000, transactions: 122 },
  ];

  const demographicData = [
    { year: "2020", population: 150000, households: 65000 },
    { year: "2021", population: 152000, households: 66500 },
    { year: "2022", population: 153500, households: 67800 },
    { year: "2023", population: 155000, households: 69000 },
  ];

  const ageVsPriceData = [
    { age: 2, price: 45000000 },
    { age: 5, price: 42000000 },
    { age: 8, price: 38000000 },
    { age: 10, price: 35000000 },
    { age: 12, price: 33000000 },
    { age: 15, price: 30000000 },
    { age: 18, price: 28000000 },
    { age: 20, price: 26000000 },
    { age: 25, price: 24000000 },
    { age: 30, price: 22000000 },
  ];
  return (
    <div className="p-4 w-full max-w-full">
      <Link
        href="/search"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        不動産価格を検索
      </Link>
      <div className="space-y-4 p-4 w-full max-w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>平均成約価格推移</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-[70vw]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={priceData}
                  margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2563eb"
                    name="成約価格"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>月間取引件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="transactions" fill="#3b82f6" name="取引件数" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>人口・世帯数推移</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demographicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="population"
                    stroke="#2563eb"
                    name="人口"
                  />
                  <Line
                    type="monotone"
                    dataKey="households"
                    stroke="#7c3aed"
                    name="世帯数"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>築年数と価格の関係</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" name="築年数" unit="年" />
                  <YAxis dataKey="price" name="価格" unit="円" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  <Scatter name="物件" data={ageVsPriceData} fill="#3b82f6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
