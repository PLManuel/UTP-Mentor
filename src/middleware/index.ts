import type { MiddlewareHandler } from "astro"
 
 export const onRequest: MiddlewareHandler = async (context, next) => {
   const { pathname } = context.url
   const token = context.cookies.get("authToken")?.value
   const userInfoRaw = context.cookies.get("userInfo")?.value
 
   let userInfo: { rol?: string } = {}
 
   try {
     if (userInfoRaw) {
       userInfo = JSON.parse(decodeURIComponent(userInfoRaw))
     }
   } catch (err) {
     console.error("Error al parsear userInfo:", err)
     context.cookies.delete("userInfo", { path: "/" })
   }
 
   const publicRoutes = [
     "/login",
     "/register",
     "/registerAdmin",
     "/api/auth/login",
     "/api/auth/register",
   ]
 
   const alumnoRoutes = ["/resources"]
   const PROFESORRoutes = ["/resources"]
   const administradorRoutes = [
     "/dashboard",
     "/resources",
     "/registerAdmin",
     "/api/auth/registerAdmin",
   ]
 
   const isPublic = publicRoutes.some((route) => pathname.startsWith(route))
 
   if (!token && !isPublic) {
     return Response.redirect(new URL("/login", context.url))
   }
 
   if (token && publicRoutes.includes(pathname)) {
     if (userInfo.rol === "ADMINISTRADOR") {
       return Response.redirect(new URL("/dashboard", context.url))
     } else if (userInfo.rol === "ALUMNO" || userInfo.rol === "PROFESOR") {
       return Response.redirect(new URL("/resources", context.url))
     }
   }
 
   const accessMap: Record<string, string[]> = {
     ALUMNO: alumnoRoutes,
     PROFESOR: PROFESORRoutes,
     ADMINISTRADOR: administradorRoutes,
   }
 
   const allowedRoutes = accessMap[userInfo.rol || ""] || []
 
   const isRestricted = Object.values(accessMap)
     .flat()
     .some((route) => pathname.startsWith(route))
 
   const isAuthorized = allowedRoutes.some((route) => pathname.startsWith(route))
 
   if (isRestricted && !isAuthorized) {
     if (userInfo.rol === "ADMINISTRADOR") {
       return Response.redirect(new URL("/dashboard", context.url))
     } else if (userInfo.rol === "ALUMNO" || userInfo.rol === "PROFESOR") {
       return Response.redirect(new URL("/resources", context.url))
     } else {
       return Response.redirect(new URL("/login", context.url))
     }
   }
 
   return next()
 }