import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("token");
  const user = cookieStore.get("user");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value: appToken } = token;
  const { value: appUser } = user;

  return new Response(
    JSON.stringify({
      user: appUser,
      token: appToken,
    }),
    {
      status: 200,
    }
  );
}
