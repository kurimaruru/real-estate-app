import { Company, SearchFormValues } from "@/type";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  company: Company;
  form: UseFormReturn<SearchFormValues>;
};

export const StationAccordion = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState({ open: false, lineIndex: 0 });
  const [selectedStation, setSelectedStation] = useState("");
  return (
    <>
      <span className="font-medium">{props.company.name}</span>
      {props.company.lines.map((line, li) => (
        <div className="border-t border-gray-200" key={line.line}>
          <button
            onClick={(e: any) => {
              e?.preventDefault();
              setIsExpanded({ open: !isExpanded.open, lineIndex: li });
            }}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="font-small">{line.line}</span>
            {isExpanded.open ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {isExpanded.open && isExpanded.lineIndex === li && (
            <div className="space-y-2 pb-2">
              {line.stations.map((station) => (
                <div key={station.name} className="flex items-center px-4 py-2">
                  <input
                    type="radio"
                    id={station.name}
                    className="w-4 h-4 mr-3 rounded border-gray-300"
                    value={station.code}
                    checked={station.code === selectedStation}
                    onChange={() => {
                      setSelectedStation(station.code);
                      props.form.setValue("station", station.code);
                    }}
                  />
                  <label
                    htmlFor={station.name}
                    className="flex justify-between w-full text-sm"
                  >
                    <span>{station.name}</span>
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
