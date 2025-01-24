import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <Link
        href="/search"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        不動産価格を検索
      </Link>
    </div>
  );
}
