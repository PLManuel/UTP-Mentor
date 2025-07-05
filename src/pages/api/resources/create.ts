import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData()

  const file = formData.get("file") as File
  const jsonText = formData.get("json")?.toString()

  const token = cookies.get("authToken")?.value

  if (!file || !jsonText || !token) {
    return new Response(JSON.stringify({ error: "Faltan datos o token" }), {
      status: 400,
    })
  }

  const json = JSON.parse(jsonText)

  if (!json.titulo || !json.descripcion || !json.idCurso || !json.idUsuario) {
    return new Response(JSON.stringify({ error: "Datos JSON incompletos" }), {
      status: 400,
    })
  }

  const backendFormData = new FormData()
backendFormData.append("file", file, file.name)
backendFormData.append(
  "json",
  new Blob([JSON.stringify(json)], { type: "application/json" }),
  "json.json"
)

  for (const pair of backendFormData.entries()) {
    console.log(pair[0], pair[1])
  }
  try {
    const response = await fetch("http://localhost:8080/recurso/crear", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: backendFormData,
    })

    const contentType = response.headers.get("content-type") || ""

    if (!response.ok) {
      let errorBody = contentType.includes("application/json")
        ? await response.json()
        : await response.text()

      console.error("Error del backend:", errorBody)

      return new Response(
        JSON.stringify({
          error: "Error en crear el recurso",
          details: errorBody,
        }),
        { status: response.status }
      )
    }

    const result = contentType.includes("application/json")
      ? await response.json()
      : await response.text()

    return new Response(JSON.stringify(result), { status: 201 })
  } catch (err) {
    console.error("Error:", err)
    return new Response(
      JSON.stringify({ error: "Error interno", details: err }),
      {
        status: 500,
      }
    )
  }
}
