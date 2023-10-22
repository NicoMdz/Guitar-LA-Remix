import { useLoaderData } from "@remix-run/react"
import { getGuitarras } from "../models/guitarras.server"
import ListadoGuitarras from "../components/listadoGuitarras"


export function meta() {
  return [
    { title: "GuitarLA - Tienda de Guitarras" },
    { description: "GuitarLA - Nuestra colección de guitarras" }
  ]
}


export async function loader() { //llamada simple, no es necesario asociar en otro lugar
    const guitarras = await getGuitarras()
    return guitarras.data
}

function Tienda() {

  const guitarras = useLoaderData()

  return (
     
        <ListadoGuitarras
          guitarras={guitarras}
        />
  
  )
}

export default Tienda