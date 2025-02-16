import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StationAccordion } from "./stationAccordion";
import { Companies, Prefectures, SearchFormValues } from "@/type";
import { UseFormReturn } from "react-hook-form";

type Props = {
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<Prefectures>>;
  form: UseFormReturn<SearchFormValues>;
  stationCompanies: Companies | undefined;
};
export const SelectTownOrStation = (props: Props) => {
  // 都道府県データ（一部抜粋）
  const prefectures = [
    // kanto
    "tokyo",
    "chiba",
    "kanagawa",
    "ibaragi",
    "totigi",
    "saitama",
    "gunma",
  ];
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">都道府県</label>
        <Select
          onValueChange={(value: Prefectures) => {
            props.form.setValue("area", value);
            props.setSelectedPrefectures(value);
          }}
          defaultValue={props.form.getValues("area")}
        >
          <SelectTrigger>
            <SelectValue placeholder="都道府県を選択" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800">
            {prefectures.map((pref) => (
              <SelectItem key={pref} value={pref}>
                {pref}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {props.form.watch("searchType") === "town" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">市区町村</label>
          <Input
            {...props.form.register("city")}
            placeholder="例: 13101"
            className="w-full"
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {props.form.watch("searchType") === "station" &&
          props.stationCompanies?.companies.map((company) => (
            <StationAccordion
              company={company}
              form={props.form}
              key={company.name}
            />
          ))}
      </div>
    </>
  );
};
