

export default function Curso({curso}) {

    const { contenido, imagen, titulo } = curso
    
    return (
        <section className="curso">
            {/* Añadimos la imagen de fondo de esta manera ya que no se puede acceder a la 
            img que viene de la api desde una hoja de estilos*/}
            <style jsx="true">{`
                .curso {
                    background-image: linear-gradient(to right, rgb(0 0 0 / 0.65), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url})
                }
            `}    
            </style>
            <div className="contenedor curso-grid">
                <div className="contenido">
                    <h2 className="heading">{titulo}</h2>
                    <p className="texto">{contenido}</p>
                </div>
            </div>
        </section>
  )
}
