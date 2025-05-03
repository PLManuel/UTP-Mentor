import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies }) => {
  cookies.set("authToken", "", {
    path: "/",
    httpOnly: true,
    secure: !import.meta.env.DEV,
    sameSite: "strict",
    maxAge: 0,
  })

  cookies.set("userInfo", "", {
    path: "/",
    httpOnly: true,
    secure: !import.meta.env.DEV,
    sameSite: "strict",
    maxAge: 0,
  })

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
