"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useCallback, useEffect, useState } from "react";

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
import { SearchIcon } from "lucide-react";
import { PrefectureAccordion } from "@/components/common/PrefectureAccordion";
import { Button } from "@/components/ui/button";

export default function SearchModal() {
  const router = useRouter();
  const [selectedPrefectures, setSelectedPrefectures] =
    useState<Prefectures>("tokyo");
  const [stationCompanies, setStationCompanies] = useState<Companies>();
  const [pageIndex, setPageIndex] = useState<number>(0);

  const resetState = useCallback(() => {
    setSelectedPrefectures("tokyo");
    setStationCompanies(undefined);
    setPageIndex(0);
  }, []);

  useEffect(() => {
    import("@/utils/ui/kanto").then((module) => {
      setStationCompanies(module[selectedPrefectures]);
    });
  }, [selectedPrefectures]);

  const pathname = usePathname();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      area: "all",
      city: "",
      searchType: "town",
      layout: [],
      builtYear: 5,
      station: "",
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    console.log("data", data);
    const apiParams = {
      year: "2020",
      builtYear: data.builtYear,
      area: data.area,
      city: data.city,
      layout: data.layout.join(","),
      station: data.station,
    };

    // URLSearchParamsを使用してクエリ文字列を構築
    const searchParams = new URLSearchParams();
    Object.entries(apiParams).forEach(([key, value]) => {
      if (value !== undefined && value !== "")
        searchParams.append(key, value.toString());
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
        <DialogTitle>
          <SearchIcon className="inline-block mr-1" />
          不動産価格情報検索
        </DialogTitle>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="px-4 h-[50vh] overflow-y-auto  hidden-scrollbar">
            {pageIndex !== 0 && (
              <Button
                onClick={() => setPageIndex(pageIndex - 1)}
                variant="link"
                className="m-0 p-0 hover:text-blue-500"
              >
                ＜ 戻る
              </Button>
            )}
            {pageIndex === 0 && (
              <>
                <WhichStationOrTown form={form} />
                <label className="text-sm font-medium">都道府県</label>
                <PrefectureAccordion
                  setPageIndex={setPageIndex}
                  setSelectedPrefectures={setSelectedPrefectures}
                  form={form}
                />
              </>
            )}
            {pageIndex === 1 && (
              <SelectTownOrStation
                setSelectedPrefectures={setSelectedPrefectures}
                form={form}
                stationCompanies={stationCompanies}
                setPageIndex={setPageIndex}
              />
            )}
            {pageIndex === 2 && <AditionalCondition form={form} />}
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
