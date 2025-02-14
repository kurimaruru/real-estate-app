"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";

// 検証スキーマの定義
const searchFormSchema = z.object({
  priceClassification: z.string(),
  year: z.string(),
  quarter: z.string(),
  area: z.string(),
  city: z.string().optional(),
  station: z.string().optional(),
  language: z.string(),
  searchType: z.enum(["town", "station"]),
  line: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function SearchModal() {
  const [open, setOpen] = useState(true);
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      priceClassification: "all",
      year: currentYear.toString(),
      quarter: "all",
      area: "all",
      city: "",
      station: "",
      language: "ja",
      searchType: "town",
      line: "",
    },
  });

  // 都道府県データ（一部抜粋）
  const prefectures = [
    { code: "01", name: "北海道" },
    { code: "13", name: "東京都" },
    { code: "27", name: "大阪府" },
    // 他の都道府県も同様に追加
  ];

  const onSubmit = (data: SearchFormValues) => {
    // APIリクエスト時にallをから文字列に変換
    const apiParams = {
      ...data,
      priceClassification:
        data.priceClassification === "all" ? "" : data.priceClassification,
      quarter: data.quarter === "all" ? "" : data.quarter,
      area: data.area === "all" ? "" : data.area,
    };

    // URLSearchParamsを使用してクエリ文字列を構築
    const searchParams = new URLSearchParams();
    Object.entries(apiParams).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString());
    });

    // 検索結果ページへ遷移
    router.push(`searchResult?${searchParams.toString()}`);
    setOpen(false);
  };

  const handleClose = (e?: any) => {
    e?.preventDefault();
    router.back();
  };
  return (
    <Dialog open={open} onOpenChange={() => router.back()}>
      <DialogContent
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
      >
        <DialogTitle>不動産価格情報検索</DialogTitle>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <RadioGroup
            defaultValue="town"
            onValueChange={(value) =>
              form.setValue("searchType", value as "town" | "station")
            }
          >
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="town" id="r1" />
              <Label>市町村から検索</Label>
            </div>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="station" id="r2" />
              <Label>路線・駅から検索</Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">都道府県</label>
              <Select
                onValueChange={(value) => form.setValue("area", value)}
                defaultValue={form.getValues("area")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="都道府県を選択" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800">
                  <SelectItem value="all">すべて</SelectItem>
                  {prefectures.map((pref) => (
                    <SelectItem key={pref.code} value={pref.code}>
                      {pref.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {form.watch("searchType") === "town" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">市区町村</label>
                <Input
                  {...form.register("city")}
                  placeholder="例: 13101"
                  className="w-full"
                />
              </div>
            )}

            {form.watch("searchType") === "station" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">路線</label>
                  <Input
                    {...form.register("line")}
                    placeholder="例: 123456"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">駅</label>
                  <Input
                    {...form.register("station")}
                    placeholder="例: 123456"
                    className="w-full"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">価格情報区分</label>
            <Select
              onValueChange={(value) =>
                form.setValue("priceClassification", value)
              }
              defaultValue={form.getValues("priceClassification")}
            >
              <SelectTrigger>
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
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
              type="button"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              条件追加
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
