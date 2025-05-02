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
      !token
    ) {
      return new Response(JSON.stringify({ error: "Faltan datos o token" }), {
        status: 400,
      })
    }

    const response = await fetch("http://localhost:8080/usuario/actualizar", {
      method: "PUT",
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
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return new Response(
        JSON.stringify({ error: error.message || "Error al actualizar usuario" }),
        {
          status: response.status,
        }
      )
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    })
  } catch (err) {
    console.error("Error interno:", err)
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
    })
  }
}
