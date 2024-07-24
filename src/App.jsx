import { useEffect, useState } from "react"
import { Footer } from "./components/Footer"
import { Guitarra } from "./components/Guitarra"
import { Header } from "./components/Header"
import { db } from "./data/db"






function App() {

  // funcion que mantiene en el carrito las cantidades y se mantiene en localStorage
  const inicialCarrito = ()=> {
    const localStorageCart = localStorage.getItem('carrito') // para obtener el carrito
    return localStorageCart ? //entonces de convietre con parse a string
    
    JSON.parse(localStorageCart) //se comprueba si hay algo en la variante 
    :[] // si no tiene nada : devuelve un arrreglo vacio 
  }

  // controla el estado de la base de datos usando state
    const [data, setdata] = useState(db)  
    //controla los estados del carrito
    const [carrito, setcarrito] = useState(inicialCarrito)  // valor inicial 
   
   //para mantener el local storange los articulos del carrito 
    useEffect(() => {
      localStorage.setItem('carrito', JSON.stringify(carrito))
    
     
    }, [carrito])
    

    // variante de limited de cantidad en el carrito 
    const MAX_ITEN = 5
    const MIN_ITEN = 1

    // addCart agrega iten al carrito
    function addCart(item) {

      const itenExit = carrito.findIndex(guitarrap => guitarrap.id === item.id) // se revisa si existen iten en el cart
      if( itenExit >= 0) { // estre es el carrito si existe 
        if (carrito[itenExit].quantity >= MAX_ITEN) {  // se limita a que el usuario tenga un limited al darle a una guitarra 
          return
        }
        const updateCar = [...carrito] //trae un nuevo arreglo del carrito existente
  updateCar [itenExit].quantity++ //actualiza uno mas del mismo en el carrito
  setcarrito(updateCar) // se llama a la funcion que se actualiza

}
  else {
    item.quantity = 1
    // trae un nuevo arreglo sin modificar el original y lo agrega a item como cuantity  
    setcarrito( [...carrito, item])
  }
  
 }

 function removCat(id) {
      //remueve del carrito los itens y lo revisa con filter se eliminan las diferentes
        setcarrito(prevCart => prevCart.filter(guitarrap => guitarrap.id !== id))
 }

      // actualiza la cantidad que esta en el carrito usando .map y no modifica carrito porque se crea una nueva variante 
 function incrementarCantidad(id) {
  // se crea una nueva variante para recorrer el carrito con map 
      const sumarCantidad = carrito.map( item => 
        // se pregunta si el item es igual al id
        { if (item.id === id && item.quantity < MAX_ITEN) 
          {
            // devuelve una copia del arreglo iten lo cual no se modifica 
            return{
              ...item,
              // incxrementa uno del item en la cantidad
              quantity: item.quantity + 1 
            } 
          }
          // sino devuelve el item fuera del if 
          return item
          
        })
        //  se manda a llamar la funcion por fuera del if
        setcarrito(sumarCantidad)
    }

  function restarCantidad(id) {
    const quitarCantidad = carrito.map( item => {

      if (item.id === id && item.quantity > MIN_ITEN) {

        return {
          ...item,
          quantity: item.quantity - 1 
        }
    }
      return item
  })
  setcarrito(quitarCantidad)
    
  }
  // limpiar carrito se llama al setcarrito con un array vacio 
  function limpiarCar() {
    setcarrito([])
  }
   


  return (
    <>
    {/* // se le pasan al Header las propiedades del carrito para poderlas usar en Headre */}
    <Header
    carrito={carrito}
    removCat={removCat}
    incrementarCantidad={incrementarCantidad}
    restarCantidad={restarCantidad}
    limpiarCar={limpiarCar}
    />

  <main className="container-xl mt-5">
      <h2 className="text-center">Nuestra Colección</h2>
      {/* como mostrar un arreglo usando state y .map va dentro del retrun se le pasan la propiedades */}
      <div className="row mt-5">
            {data.map( (guitarrap) => {
              return(
                <Guitarra
                key={guitarrap.id}
               guitarrap={guitarrap}
               setcarrito={setcarrito}
               addCart={addCart}
               restarCantidad={restarCantidad}
                />
              )
            })}
 
        </div>
      
  </main>

    <Footer/>
  
    </>
  )
}

export default App
