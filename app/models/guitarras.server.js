//Al nombrar este archivo con ".server" le estamos diciendo a remix
//que solo debe de ejecutarse en la parte del servidor

export async function getGuitarras() {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`) //Cambiar localhost por 127.0.0.1
    const resultado = await respuesta.json()
    return resultado  
}

export async function getGuitarra(url) {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    return await respuesta.json()
}   