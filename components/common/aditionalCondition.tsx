import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { SearchFormValues } from "@/type";

type Props = {
  form: UseFormReturn<SearchFormValues>;
};

export const AditionalCondition = (props: Props) => {
  const floarMapObj = [
    {
      key: "1K/1DK/1LDK",
      val: ["1K", "1DK", "1LDK"],
    },
    {
      key: "2K/2DK/2LDK",
      val: ["2K", "2DK", "2LDK"],
    },
    {
      key: "3K/3DK/3LDK",
      val: ["3K", "3DK", "3LDK"],
    },
    {
      key: "4K/4DK/4LDK",
      val: ["4K", "4DK", "4LDK"],
    },
    {
      key: "5K以上",
      val: [],
    },
  ];
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">間取り</label>
        {floarMapObj.map((option) => (
          <div key={option.key} className="flex items-center space-x-2">
            <Checkbox
              id={option.key}
              value={option.val}
              onCheckedChange={(checked) => {
                if (checked) {
                  props.form.setValue("layout", [...option.val]);
                } else {
                  props.form.setValue("layout", []);
                }
              }}
            />
            <Label htmlFor={option.key}>{option.key}</Label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">築年数</label>
        <div className="flex justify-between">
          <span>5年以内</span>
          <span>30年以上</span>
        </div>
        <Slider
          defaultValue={[5]}
          min={5}
          max={30}
          step={5}
          onValueChange={(value: number[]) => {
            props.form.setValue("builtYear", value[0]);
          }}
          aria-label="築年数スライダー"
        />
        <div>
          選択された築年数:
          {`${
            props.form.watch("builtYear") === 0
              ? "5"
              : props.form.watch("builtYear")
          }年${props.form.watch("builtYear") === 30 ? "以上" : "以内"}`}
        </div>
      </div>
    </>
  );
};
