import { Button } from "@/components/ui/button";
import { PriceChart } from "@/components/common/priceChart";
import Link from "next/link";
import { headers } from "next/headers";

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  // サーバー側のホスト情報を取得
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  // クエリパラメータの構築
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      queryParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((val) => queryParams.append(key, val));
    } else {
      console.warn(`無効な値: ${key} = ${value}`);
    }
  });

  const queryString = queryParams.toString();
  console.log(`クエリパラメータ: ${queryString}`);

  // 絶対URLを使用してAPIを呼び出す
  const apiUrl = `${protocol}://${host}/api/search?${queryString}`;
  console.log(`APIリクエストURL: ${apiUrl}`);

  let result;
  let error = null;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`APIエラー: ${res.status} ${res.statusText}`);
    }
    result = await res.json();
    console.log("API結果:", result);
  } catch (err) {
    console.error("データ取得エラー:", err);
    error = err instanceof Error ? err.message : "不明なエラーが発生しました";
  }

  return (
    <div className="p-4 w-full max-w-full">
      <Link href="/search">
        <Button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          不動産価格を検索
        </Button>
      </Link>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
          エラー: {error}
        </div>
      )}

      {result ? (
        <div className="mt-4">
          <PriceChartWrapper data={result} />
        </div>
      ) : (
        !error && <div className="mt-4">データがありません</div>
      )}
    </div>
  );
}

// クライアントコンポーネントをサーバーコンポーネント内で使用するためのラッパー
const PriceChartWrapper = ({ data }: { data: any }) => {
  // クライアントコンポーネントに渡すためのプロップとしてデータを準備
  // このコンポーネントはサーバーコンポーネントからのデータを受け取り、
  // クライアントコンポーネントであるPriceChartに渡す中間コンポーネントです
  return <PriceChart />;
};
