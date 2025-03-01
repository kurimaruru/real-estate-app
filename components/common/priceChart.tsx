"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export const PriceCharts = () => {
  const priceData = [
    { structure: "1K/1DK/1LDK", price: 35000000, transactions: 120 },
    { structure: "2K/2DK/2LDK", price: 36500000, transactions: 115 },
    { structure: "3K/3DK/3LDK", price: 35800000, transactions: 125 },
    { structure: "4K/4DK/4LDK", price: 37200000, transactions: 118 },
    { structure: "5K/5DK/5LDK", price: 38100000, transactions: 130 },
    { structure: "5LDK以上", price: 38500000, transactions: 122 },
  ];

  const structureDepreciationData = [
    { age: 0, 木造: 100, 軽量鉄骨: 100, 鉄骨造: 100, RC造: 100, SRC造: 100 },
    { age: 5, 木造: 82, 軽量鉄骨: 85, 鉄骨造: 88, RC造: 92, SRC造: 93 },
    { age: 10, 木造: 68, 軽量鉄骨: 74, 鉄骨造: 78, RC造: 85, SRC造: 88 },
    { age: 15, 木造: 56, 軽量鉄骨: 65, 鉄骨造: 70, RC造: 79, SRC造: 83 },
    { age: 20, 木造: 47, 軽量鉄骨: 57, 鉄骨造: 64, RC造: 74, SRC造: 78 },
    { age: 25, 木造: 39, 軽量鉄骨: 51, 鉄骨造: 58, RC造: 70, SRC造: 74 },
    { age: 30, 木造: 32, 軽量鉄骨: 45, 鉄骨造: 53, RC造: 66, SRC造: 70 },
    { age: 35, 木造: 27, 軽量鉄骨: 40, 鉄骨造: 49, RC造: 62, SRC造: 67 },
    { age: 40, 木造: 22, 軽量鉄骨: 36, 鉄骨造: 45, RC造: 59, SRC造: 64 },
    { age: 45, 木造: 18, 軽量鉄骨: 32, 鉄骨造: 42, RC造: 56, SRC造: 61 },
    { age: 50, 木造: 15, 軽量鉄骨: 29, 鉄骨造: 39, RC造: 53, SRC造: 58 },
  ];

  const buildingAgeData = [
    { age: 0, studio: 78, oneBedroom: 72, twoBedroom: 68, threeBedroom: 65 },
    { age: 5, studio: 70, oneBedroom: 65, twoBedroom: 62, threeBedroom: 61 },
    { age: 10, studio: 62, oneBedroom: 59, twoBedroom: 57, threeBedroom: 56 },
    { age: 15, studio: 55, oneBedroom: 53, twoBedroom: 52, threeBedroom: 51 },
    { age: 20, studio: 48, oneBedroom: 46, twoBedroom: 47, threeBedroom: 47 },
    { age: 25, studio: 43, oneBedroom: 41, twoBedroom: 43, threeBedroom: 44 },
    { age: 30, studio: 38, oneBedroom: 37, twoBedroom: 40, threeBedroom: 41 },
    { age: 35, studio: 34, oneBedroom: 35, twoBedroom: 37, threeBedroom: 39 },
    { age: 40, studio: 32, oneBedroom: 33, twoBedroom: 35, threeBedroom: 38 },
  ];
  return (
    <div className="space-y-4 p-4 w-full max-w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>平均取引価格(間取り)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-[70vw]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceData}
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="structure" />
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
          <CardTitle>築年数と価格の関係 (万円/㎡)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-10 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                間取りタイプ別の築年数による価格変動
              </p>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={buildingAgeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age">
                      <Label value="築年数 (年)" position="bottom" offset={0} />
                    </XAxis>
                    <YAxis>
                      <Label
                        value="価格 (万円/㎡)"
                        angle={-90}
                        position="left"
                        offset={-10}
                      />
                    </YAxis>
                    <Tooltip formatter={(value) => [`${value}万円/㎡`, ""]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="studio"
                      name="1R/1K"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="oneBedroom"
                      name="1LDK/2K"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="twoBedroom"
                      name="2LDK/3K"
                      stroke="#ffc658"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="threeBedroom"
                      name="3LDK以上"
                      stroke="#ff8042"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>構造別の築年数と残存価値</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              建物構造による経年減価の違い（新築時=100）
            </p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={structureDepreciationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age">
                    <Label value="築年数 (年)" position="bottom" offset={0} />
                  </XAxis>
                  <YAxis domain={[0, 100]}>
                    <Label
                      value="残存価値 (%)"
                      angle={-90}
                      position="left"
                      offset={-15}
                    />
                  </YAxis>
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="木造"
                    name="木造"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="軽量鉄骨"
                    name="軽量鉄骨"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="鉄骨造"
                    name="鉄骨造"
                    stroke="#ffc658"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="RC造"
                    name="RC造"
                    stroke="#ff8042"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="SRC造"
                    name="SRC造"
                    stroke="#0088FE"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
