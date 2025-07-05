import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.json()
    const token = cookies.get("authToken")?.value

    if (!data.name || !token) {
      return new Response(JSON.stringify({ error: "Faltan datos o token" }), {
        status: 400,
      })
    }

    console.log("Datos recibidos:", data)

    const backendResponse = await fetch(
      `http://localhost:8080/recurso/descargar?nombreArchivo=${encodeURIComponent(
        data.name
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text()
      return new Response(JSON.stringify({ error: errorText }), {
        status: backendResponse.status,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Leer el archivo como stream
    const fileStream = backendResponse.body

    // Obtener el nombre del archivo del header original (si viene)
    const contentDisposition = backendResponse.headers.get(
      "content-disposition"
    )
    const contentType =
      backendResponse.headers.get("content-type") || "application/octet-stream"

    const headers = new Headers({
      "Content-Type": contentType,
    })

    if (contentDisposition) {
      headers.set("Content-Disposition", contentDisposition)
    } else {
      headers.set("Content-Disposition", `attachment; filename="${data.name}"`)
    }

    return new Response(fileStream, {
      status: 200,
      headers,
    })
  } catch (err) {
    console.error("Error:", err)
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
