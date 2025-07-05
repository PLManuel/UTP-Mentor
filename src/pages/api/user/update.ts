import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.json()
    const token = cookies.get("authToken")?.value

    console.log(JSON.stringify(data))

    const response = await fetch("http://localhost:8080/usuario/actualizar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      return new Response(
        JSON.stringify({
          error: error.message || "Error al actualizar usuario",
        }),
        {
          status: response.status,
        }
      )
    }

    const updatedUser = await response.json()

    // cookies.set(
    //   "userInfo",
    //   encodeURIComponent(
    //     JSON.stringify({
    //       nombre: updatedUser.nombres,
    //       apellido: updatedUser.apellidos,
    //       correo: updatedUser.email,
    //       dni: updatedUser.dni,
    //       rol: updatedUser.roles,
    //     })
    //   ),
    //   {
    //     path: "/",
    //     httpOnly: false,
    //     secure: !import.meta.env.DEV,
    //     sameSite: "strict",
    //     maxAge: 60 * 60 * 24,
    //   }
    // )

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    })
  } catch (err) {
    console.error("Error interno:", err)
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
      }
    )
  }
}
