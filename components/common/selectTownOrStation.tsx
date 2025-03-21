import { StationAccordion } from "./stationAccordion";
import { Cities, Companies, Prefectures, SearchFormValues } from "@/type";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<SearchFormValues>;
  stationCompanies: Companies | undefined;
  cities: Cities | undefined;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
};
export const SelectTownOrStation = (props: Props) => {
  return (
    <>
      {props.form.watch("searchType") === "town" && (
        <div className="space-y-2">市町村を選択</div>
      )}
      {props.form.watch("searchType") === "town" &&
        props.cities?.cities.map((city) => (
          <div className="flex items-center px-4 py-2" key={city.id}>
            <input
              type="radio"
              id={city.name}
              className="w-4 h-4 mr-3 rounded border-gray-300"
              value={city.id}
              onChange={(e) => {
                props.setPageIndex(2);
                props.form.setValue("city", city.id);
              }}
            />
            <label
              htmlFor={city.name}
              className="flex justify-between w-full text-sm"
            >
              <span>{city.name}</span>
            </label>
          </div>
        ))}
      <div className="grid grid-cols-1 gap-4">
        {props.form.watch("searchType") === "station" &&
          props.stationCompanies?.companies.map((company) => (
            <StationAccordion
              company={company}
              form={props.form}
              key={company.name}
              setPageIndex={props.setPageIndex}
            />
          ))}
      </div>
    </>
  );
};
