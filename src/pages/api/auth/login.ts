import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.json()

    if (!data.correo || !data.contraseña) {
      return new Response(JSON.stringify({ error: "Campos incompletos" }), {
        status: 400,
      })
    }

    const payload = {
      email: data.correo.trim(),
      contraseña: data.contraseña,
    }

    const response = await fetch("http://localhost:8080/usuario/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const responseData = await response.json()

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: responseData.message || "Error en inicio de sesión",
        }),
        { status: response.status }
      )
    }

    cookies.set("authToken", responseData.token.token, {
      path: "/",
      httpOnly: true,
      secure: !import.meta.env.DEV,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    })

    cookies.set(
      "userInfo",
      encodeURIComponent(
        JSON.stringify({
          id: responseData.id,
          nombre: responseData.nombre,
          apellido: responseData.apellido,
          dni: responseData.dni,
          correo: responseData.correo,
          rol: responseData.rol,
          cursos: responseData.cursos,
        })
      ),
      {
        path: "/",
        httpOnly: false,
        secure: !import.meta.env.DEV,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      }
    )

    let redirectTo = "/dashboard"
    if (responseData.rol === "ALUMNO") {
      redirectTo = "/resources"
    }

    return new Response(JSON.stringify({ redirectTo }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error en login:", error)
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    })
  }
}
