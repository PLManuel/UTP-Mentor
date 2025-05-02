import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.json()

    const token = cookies.get("authToken")?.value

    if (
      !data.nombre ||
      !data.apellido ||
      !data.dni ||
      !data.correo ||
      !data.contraseña ||
      !data.rol ||
      !token
    ) {
      return new Response(JSON.stringify({ error: "Faltan datos o token" }), {
        status: 400,
      })
    }

    console.log(
      JSON.stringify({
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        correo: data.correo,
        contraseña: data.contraseña,
        rol: data.rol,
        token: token,
      })
    )

    const response = await fetch("http://localhost:8080/usuario/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        correo: data.correo,
        contraseña: data.contraseña,
        rol: data.rol,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return new Response(
        JSON.stringify({ error: error.message || "Error en registro" }),
        {
          status: response.status,
        }
      )
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
    })
  } catch (err) {
    console.error("Error:", err)
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    })
  }
}
