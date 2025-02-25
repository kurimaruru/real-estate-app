import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SearchFormValues } from "@/type";

export const WhichStationOrTown = ({
  form,
}: {
  form: UseFormReturn<SearchFormValues>;
}) => {
  return (
    <>
      <label className="text-sm font-medium">検索方法を選択してください</label>
      <div className="mt-3">
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
      </div>
    </>
  );
};
