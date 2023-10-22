import imagen from "../../public/img/nosotros.jpg"
import styles from "../styles/nosotros.css"
export function meta() {
    return [
        { title: "GuitarLA - Nosotros" },
        { description: "Venta de guitarras, blog de música"}
    ];
}
export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles
    },
    {
      rel: "preload", //Prioriza la carga de este elemento al cargar la página (recomendado en imagenes, videos o elementos muy grandes/pesados )
      href: imagen,
      as: "image"
    }
  ]
}
        
function Nosotros() {

  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      
      <div className="contenido">
          <img src={imagen} alt="imagen sobre nosotros" />

          <div className="texto">
            <p>Ut facilisis, nibh pretium facilisis rutrum, justo nibh mollis odio, ut laoreet erat ante ac justo. Aliquam commodo eros at porta congue. Praesent eget molestie lacus. Maecenas pharetra odio in massa pretium molestie. Aenean volutpat vel ligula in accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis sollicitudin neque.</p>

            <p>Ut facilisis, nibh pretium facilisis rutrum, justo nibh mollis odio, ut laoreet erat ante ac justo. Aliquam commodo eros at porta congue. Praesent eget molestie lacus. Maecenas pharetra odio in massa pretium molestie. Aenean volutpat vel ligula in accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis sollicitudin neque.</p>
          </div>
      </div>
    </main>
  )
}

export default Nosotros