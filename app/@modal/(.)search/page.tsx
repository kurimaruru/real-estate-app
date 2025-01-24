"use client";

import { Dialog } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SearchModal() {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    priceClassification: "all",
    year: currentYear.toString(),
    quarter: "all",
    area: "all",
    city: "",
    station: "",
    language: "ja",
  });

  // 都道府県データ（一部抜粋）
  const prefectures = [
    { code: "01", name: "北海道" },
    { code: "13", name: "東京都" },
    { code: "27", name: "大阪府" },
    // 他の都道府県も同様に追加
  ];

  // 年のオプションを生成（2005年から現在まで）
  const years = Array.from({ length: currentYear - 2004 }, (_, i) =>
    (currentYear - i).toString()
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // APIリクエスト時にallをから文字列に変換
    const apiParams = {
      ...formData,
      priceClassification:
        formData.priceClassification === "all"
          ? ""
          : formData.priceClassification,
      quarter: formData.quarter === "all" ? "" : formData.quarter,
      area: formData.area === "all" ? "" : formData.area,
    };
  };
  const [checkValue, setCheckValue] = useState<"town" | "station">("town");
  const handleCheckBox = (value: "town" | "station") => {
    setCheckValue(value);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const router = useRouter();
  return (
    <Dialog open onOpenChange={() => router.back()}>
      <div className="fixed inset-0 bg-black/25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>不動産価格情報検索</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit} className="space-y-4">
                {/* 価格情報区分 */}
                <RadioGroup
                  defaultValue="town"
                  onValueChange={(e) => handleCheckBox(e as "town" | "station")}
                >
                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="town" id="r1" />
                    <Label>市町村から検索</Label>
                  </div>
                  <div className="flex items-center space-x-2  py-1">
                    <RadioGroupItem value="station" id="r2" />
                    <Label>路線・駅から検索</Label>
                  </div>
                </RadioGroup>
                <div className="grid grid-cols-1 gap-4">
                  {/* 都道府県 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">都道府県</label>
                    <Select
                      value={formData.area}
                      onValueChange={(value) => handleChange("area", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="都道府県を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        {prefectures.map((pref) => (
                          <SelectItem key={pref.code} value={pref.code}>
                            {pref.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {checkValue === "town" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">市区町村</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="例: 13101"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        pattern="[0-9]{5}"
                      />
                    </div>
                  )}
                  {checkValue === "station" && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">路線</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="例: 123456"
                          value={formData.station}
                          onChange={(e) =>
                            handleChange("station", e.target.value)
                          }
                          pattern="[0-9]{6}"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">駅</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="例: 123456"
                          value={formData.station}
                          onChange={(e) =>
                            handleChange("station", e.target.value)
                          }
                          pattern="[0-9]{6}"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">価格情報区分</label>
                  <Select
                    value={formData.priceClassification}
                    onValueChange={(value) =>
                      handleChange("priceClassification", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="01">不動産取引価格情報のみ</SelectItem>
                      <SelectItem value="02">成約価格情報のみ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    検索
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    条件追加
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Dialog>
  );
}
