"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Companies,
  Prefectures,
  searchFormSchema,
  SearchFormValues,
} from "@/type";
import { WhichStationOrTown } from "@/components/common/whichStationOrTown";
import { SelectTownOrStation } from "@/components/common/selectTownOrStation";
import { AditionalCondition } from "@/components/common/aditionalCondition";

export default function SearchModal() {
  const router = useRouter();
  const [selectedPrefectures, setSelectedPrefectures] =
    useState<Prefectures>("tokyo");
  const pathname = usePathname();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      area: "all",
      city: "",
      language: "ja",
      searchType: "town",
      line: "",
      layout: [],
      builtYear: 5,
      stationCode: "",
    },
  });

  const [stationCompanies, setStationCompanies] = useState<Companies>();

  useEffect(() => {
    import("@/utils/ui/kanto").then((module) => {
      setStationCompanies(module[selectedPrefectures]);
    });
  }, [selectedPrefectures]);

  const onSubmit = (data: SearchFormValues) => {
    console.log("data", data);
    const apiParams = {
      year: "2020",
      area: "13",
      city: "13101",
      layout: data.layout.join(","),
      builtYear: data.builtYear,
    };

    // URLSearchParamsを使用してクエリ文字列を構築
    const searchParams = new URLSearchParams();
    Object.entries(apiParams).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString());
    });

    // 検索結果ページへ遷移
    router.push(`searchResult?${searchParams.toString()}`);
  };

  const handleClose = (e?: any) => {
    e?.preventDefault();
    router.back();
  };

  return (
    <Dialog open={pathname === "/search"} onOpenChange={() => router.back()}>
      <DialogContent
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
      >
        <DialogTitle>不動産価格情報検索</DialogTitle>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="px-4 max-h-[60vh] overflow-y-auto  custom-scrollbar">
            <WhichStationOrTown form={form} />
            <SelectTownOrStation
              setSelectedPrefectures={setSelectedPrefectures}
              form={form}
              stationCompanies={stationCompanies}
            />
            <AditionalCondition form={form} />
          </div>
          <div className="grid ">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              検索
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
