import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()

    if (
      !data.nombre ||
      !data.apellido ||
      !data.dni ||
      !data.correo ||
      !data.contraseña
    ) {
      return new Response(JSON.stringify({ error: "Campos incompletos" }), {
        status: 400,
      })
    }

    if (!/^\d{8}$/.test(data.dni)) {
      return new Response(JSON.stringify({ error: "DNI inválido" }), {
        status: 400,
      })
    }

    const payload = {
      nombre: data.nombre.trim(),
      apellido: data.apellido.trim(),
      dni: data.dni.trim(),
      correo: data.correo.trim(),
      contraseña: data.contraseña,
    }

    const response = await fetch(
      "http://localhost:8080/usuario/registro/alumno",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )

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
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
    })
  }
}
