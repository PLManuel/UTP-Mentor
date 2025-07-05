import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const token = cookies.get("authToken")?.value

    console.log("Token:", token)

    if (!token) {
      return new Response(JSON.stringify({ error: "Faltan datos o token" }), {
        status: 400,
      })
    }

    const response = await fetch("http://localhost:8080/usuario/obtener", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      return new Response(
        JSON.stringify({ error: error.message || "Error en abtener usuarios" }),
        {
          status: response.status,
        }
      )
    }

    const usersData = await response.json()

    return new Response(JSON.stringify(usersData), {
      status: 201,
    })
  } catch (err) {
    console.error("Error:", err)
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    })
  }
}
