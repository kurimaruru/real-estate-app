import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // ここで実際のデータベースにユーザーを保存します
    // 例としてのみ表示しています
    console.log("新規ユーザー登録:", { name, email, password });

    // 実際のアプリケーションでは、パスワードをハッシュ化し、
    // データベースにユーザー情報を保存する処理を実装します

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ユーザー登録エラー:", error);
    return NextResponse.json(
      { message: "ユーザー登録に失敗しました" },
      { status: 500 }
    );
  }
}
