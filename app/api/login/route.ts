import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const test = false;

  if (!email || !password) {
    const errorMessages = [];
    if (!email) {
      errorMessages.push("メールアドレスを入力してください");
    }
    if (!password) {
      errorMessages.push("パスワードを入力してください");
    }

    return new Response(errorMessages.join(", "), { status: 400 });
  }

  const data = {
    user: { email, password },
  };

  if (test) {
    return new Response("ログインしました", { status: 200 });
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      data.user
    );

    if (response.status === 200) {
      return new Response("ログインしました", { status: 200 });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.data.errors) {
          const errors = error.response.data.errors;
          const errorsString = JSON.stringify(errors);
          return new Response(errorsString, { status: 500 });
        }
        return new Response(error.response.data.message, { status: 500 });
      }
    }
  }
}
