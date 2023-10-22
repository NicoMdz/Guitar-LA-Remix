//Componentes de Remix para distintas funcionalidades (func meta, func links, outlet)
import { useState, useEffect } from "react";
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
} from "@remix-run/react"
import styles from "~/styles/index.css"
import Header from "~/components/header";
import Footer from "~/components/footer";
//Agregar todo lo correspondiente al meta y mejorar SEO
export function meta() {
    return [
      { charset: "utf-8" },
      { title: "GuitarLA - Remix" },
      { name: "viewport", content: "width=device-width,initial-scale=1" },
    ];
  }


//Agregar Hojas de Estilo (importa el orden)
export function links() {
    return [
        {
            rel: "stylesheet",
            href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "true"
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
        },
        {
            rel: "stylesheet",
            href: styles
        }
    ]
}
export default function App() {
  //La solucion al LS con Remix es agregar este typeof window !== "undefined" y el : null
  const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : null
  const [carrito, setCarrito] = useState(carritoLS)
  //Se ejecuta una vez al arranque y de ahi cada que carrito cambie
  useEffect(() => {
    localStorage.setItem("carrito",JSON.stringify(carrito))
    console.log("render...")
  }, [carrito])
  
  const agregarCarrito = guitarra => {
     if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
        //Iterar sobre arreglo, identificar elemento duplicado
        const carritoActualizado = carrito.map( guitarraState => {
          if (guitarraState.id === guitarra.id) {
              //Reescribir la cantidad
              guitarraState.cantidad = guitarra.cantidad
              // guitarraState.cantidad += guitarra.cantidad <-- Suma a la cantidad con cada click
          }
          return guitarraState
        })
        //Añadir sobreescritura al carrito 
        setCarrito(carritoActualizado)
     } else {
        //Registro nuevo
        setCarrito([...carrito, guitarra])
     }
  }

  const actualizarCantidad = guitarra => {
      const carritoActualizado = carrito.map(guitarraState => {
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad
        }
        return guitarraState
      })
      setCarrito(carritoActualizado)
  }

  const eliminarGuitarra = id => {
    const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id)
    setCarrito(carritoActualizado)
  }

    return (
        <Document>
           <Outlet
              context={{
                agregarCarrito,
                carrito,
                actualizarCantidad,
                eliminarGuitarra
              }}
           />
        </Document>
    )
}

function Document({children}) {
    return(
        <html lang="es">
            <head>
              <Meta />
              <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />

                {/* Para que funcione correctamente el Link routing */}
                <Scripts /> 
                <LiveReload />
            </body>
        </html>
    )
}

//Manejo de errores 
  export function ErrorBoundary() {
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {
      return (
        <Document>
          <p className="error">
            {error.status} {error.statusText}
          </p>
          <p>{error.data}</p>
          <Link to="/" className="error-enlace">Volver a la página principal</Link>
        </Document>
      );
    } else if (error instanceof Error) {
      return (
        <Document>
          <p>Error</p>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
          <Link to="/" className="error-enlace">Volver a la página principal</Link>
        </Document>
      );
    } else {
      return <p>Unknown Error</p>;
    }
  }