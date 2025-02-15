// TODO: data型定義
export const filterSearchResult = (
  year: string,
  min: number,
  max: number,
  floorPlans: string[],
  data: any[]
) => {
  // 築年数、間取りでフィルター
  return data.filter((d, i) => {
    const builtYear = Number(year) - Number(d.BuildingYear.replace("年", ""));
    const isInYearRange = min <= builtYear && builtYear <= max;
    const isMatchFloorPlan = floorPlans.includes(d.FloorPlan);

    return isInYearRange && isMatchFloorPlan;
  });
};

// レスポンスサンプル
// Area: "30";
// Breadth: "";
// BuildingYear: "2009年";
// CityPlanning: "商業地域";
// Classification: "";
// CoverageRatio: "80";
// Direction: "";
// DistrictName: "岩本町";
// FloorAreaRatio: "600";
// FloorPlan: "";
// Frontage: "";
// LandShape: "";
// Municipality: "千代田区";
// MunicipalityCode: "13101";
// Period: "2020年第1四半期";
// Prefecture: "東京都";
// PriceCategory: "不動産取引価格情報";
// PricePerUnit: "";
// Purpose: "住宅";
// Region: "";
// Remarks: "";
// Renovation: "";
// Structure: "ＲＣ";
// TotalFloorArea: "";
// TradePrice: "32000000";
// Type: "中古マンション等";
// UnitPrice: "";
// Use: "住宅";
