import { Prefectures, SearchFormValues } from "@/type";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Prefecture = {
  name: string;
  cities: string[];
};

type Props = {
  prefecture: Prefecture;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefectures>>;
  form: UseFormReturn<SearchFormValues>;
};

export const PrefectureAccordion = ({
  prefecture,
  setPageIndex,
  setSelectedPrefectures,
  form,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={(e) => {
          e?.preventDefault();
          setIsExpanded(!isExpanded);
        }}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
      >
        <span className="font-medium">{prefecture.name}</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-2 pb-2">
          {prefecture.cities.map((city) => (
            <div key={city} className="flex items-center px-4 py-2">
              <input
                type="radio"
                id={city}
                className="w-4 h-4 mr-3 rounded border-gray-300"
                value={city}
                // checked={station.code === selectedStation}
                onChange={(e) => {
                  setPageIndex(1);
                  form.setValue("area", e.currentTarget.value);
                  setSelectedPrefectures(e.currentTarget.value as Prefectures);
                }}
              />
              <label
                htmlFor={city}
                className="flex justify-between w-full text-sm"
              >
                <span>{city}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
