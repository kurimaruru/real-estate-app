import { Prefectures, SearchFormValues } from "@/type";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { groupedPrefectures } from "@/utils/ui/prefecturesByArea";

type Props = {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefectures>>;
  form: UseFormReturn<SearchFormValues>;
};

export const PrefectureAccordion = ({
  setPageIndex,
  setSelectedPrefectures,
  form,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState({
    bool: false,
    area: "",
  });
  const nameKeys = Object.keys(groupedPrefectures);

  return (
    <>
      {nameKeys.map((key) => (
        <div className="border-t border-gray-200" key={key}>
          <button
            onClick={(e) => {
              e?.preventDefault();
              setIsExpanded({
                bool: !isExpanded.bool,
                area: key,
              });
            }}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="font-medium">
              {groupedPrefectures[key as keyof typeof groupedPrefectures].name}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {isExpanded.bool && isExpanded.area === key && (
            <div className="space-y-2 pb-2">
              {groupedPrefectures[
                key as keyof typeof groupedPrefectures
              ].prefectures.map((prefecture) => (
                <div
                  key={prefecture.code}
                  className="flex items-center px-4 py-2"
                >
                  <input
                    type="radio"
                    id={prefecture.code}
                    className="w-4 h-4 mr-3 rounded border-gray-300"
                    value={prefecture.code}
                    onChange={(e) => {
                      setPageIndex(1);
                      form.setValue("area", prefecture.code);
                      setSelectedPrefectures(prefecture.name as Prefectures);
                    }}
                  />
                  <label
                    htmlFor={prefecture.ja}
                    className="flex justify-between w-full text-sm"
                  >
                    <span>{prefecture.ja}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
