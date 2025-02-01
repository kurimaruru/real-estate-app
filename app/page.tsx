import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Search, Building2, Bell, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="w-[80vw] h-[80vh] bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">不動産市場分析</h1>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* 統計サマリー */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                平均成約価格
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,850万円</div>
              <p className="text-xs text-green-600">前月比 +1.2%</p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                月間取引件数
              </CardTitle>
              <Building2 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">122件</div>
              <p className="text-xs text-muted-foreground">前月比 -6.2%</p>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">登録物件数</CardTitle>
              <Building2 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,453件</div>
              <p className="text-xs text-purple-600">新着 48件</p>
            </CardContent>
          </Card>
        </div>

        {/* クイックアクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>クイックアクション</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Search className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">物件検索</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium">お気に入り</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Bell className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">アラート設定</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>価格上昇率TOP3エリア</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">1. 渋谷区</span>
                  <span className="text-green-600">+5.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">2. 中央区</span>
                  <span className="text-green-600">+4.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">3. 港区</span>
                  <span className="text-green-600">+3.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
