import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const formData = await request.formData();
  const mode = formData.get("mode") as string;
  const username = formData.get("username") as string | undefined;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;

  const data =
    mode === "register"
      ? {
          username,
          password,
          phoneNumber: phone,
          phoneCode: "+57",
        }
      : {
          password,
          phoneNumber: phone,
        };

  try {
    const response = await axios.post(
      `http://localhost:3100/auth/${mode}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      return Response.json({ message: "Success" }, { status: 201 });
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error during", mode, ":", error);
    return NextResponse.json(
      { error: "Error during submission" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Get the token from the cookie in browser
  const token = request.headers.get("cookie")?.split("=")[1];
  return Response.json({ request });
}

export async function DELETE(request: Request) {
  // Get the token from the cookie in browser
  const cookieStorage = cookies();
  cookieStorage.delete("authToken");
  return Response.json({ message: "Cookie deleted" });
}
