import React, { useMemo } from 'react'


export const Header = ({carrito, removCat, incrementarCantidad, restarCantidad, limpiarCar}) => {
    // state derivado
    // useMemo almacena el calculo entre renderizados cuando se agregan o quitan elementos del carrito 
    const isEmpty = useMemo (() => carrito.length === 0,[carrito])
    // estate derivado reduce (para sumar y calcular totales)
    // esta funcion usa Reduce carrito.reduce nombre total e item que yo escoja sera igual a total + iten-cantidad x el iten del precio y comienza en 0
    const totalCart = ()=> carrito.reduce((total, item) => total + (item.quantity * item.price), 0 )

  return (
    <header className="py-5 header">
    <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
                <a href="index.html">
                    <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
                </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                <div 
                    className="carrito"
                >
                    <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                    <div id="carrito" className="bg-white p-3">

                        {/* con esta funcion ternaria  detecta cuando hay items en el carrito y muesta el mensaje  que esta vacio*/}
                        { isEmpty ? 
                        
                        // lo que mostraria 
                    (    
                        <p className="text-center">El carrito esta vacio</p>

                     ) : (         
                            <>
                        <table className="w-100 table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* el parenesis retorna es como un retun se recorre toda Guitarra componente con el .map*/}
                               { carrito.map (guitarrap =>(
                                <tr key={guitarrap.id} > {/* la llave para que todo el carrito tenga el identificador */}
                                    <td>
                                        <img className="img-fluid" 
                                        src={`/img/${guitarrap.image}.jpg`} 
                                        alt="imagen guitarra" />
                                    </td>
                                    <td>{guitarrap.name}</td>
                                    <td className="fw-bold">
                                            €{guitarrap.price}
                                    </td>
                                    <td className="flex align-items-start gap-4">
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={()=> restarCantidad(guitarrap.id)}
                                        >
                                            -
                                        </button>
                                         {guitarrap.quantity} {/*la cantidad del carrito */}
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={()=> incrementarCantidad(guitarrap.id) }
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => removCat(guitarrap.id)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                              ))}
                            </tbody>
                        </table> 

                        <p className="text-end">Total pagar: 
                            <span className="fw-bold">{totalCart()} €</span></p>
                            </>

                        )}
                            
                        <button 
                        className="btn btn-dark w-100 mt-3 p-2"
                        onClick={()=> limpiarCar()}
                        
                        >Vaciar Carrito</button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</header>
  )
}
