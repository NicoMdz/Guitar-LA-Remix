import { useLoaderData } from "@remix-run/react"
import { getPost } from "../models/posts.server"
import { formatearFecha } from "../utils/helpers"

export function meta({data}) { //Este data está disponible cuando el loader regresa algo
 //meta en caso de error en pagina de alguna guitarra
      if (!data) {
        return [
          { title: "GuitarLA - Post no encontrado" }, 
          { descripcion: "Guitarras, venta de guitarras, post no encontrada" }         
        ]
      }
      return [
        { title: `GuitarLA - ${data.data[0].attributes.titulo}`},
        { descripcion: `Guitarras, venta de guitarras, post ${data.data[0].attributes.titulo}`}
      ]
    }

export async function loader( {request, params}) {
    const { postUrl } = params
    
    const post = await getPost(postUrl)
    
    if (post.data.length === 0) {
        throw new Response("", {
          status: 404,
          statusText: "Post No Encontrada"
        })
    }
  
    return post //link especifico del post
  }

export default function Post() {

  const post = useLoaderData()
  const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes
  return (
    <article className="post mt-3">
        <img  className="imagen" src={imagen?.data?.attributes.url} alt={`Imagen blog ${titulo}`}/>
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="texto">{contenido}</p>
            </div>
    </article>
  )
}
