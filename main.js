// Conectarse a datoos externos y mostrar en consola
let datos;
let categoria_selec;
let datos_array;
let lista_categorias;
let items_carrito=0;

let items_carrito_producto=[];
let lista_productos=[];

const URL = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
fetch(URL).then(res => res.json()).then(res => {
    console.log('%cmain.js line:59 res','color: #007acc', res)
    datos = res
    console.log('%cmain.js line:59 datos','color: #007acc', datos)

    //lista con los objetos json de los datos
    datos_array = Array.from(JSON.parse(JSON.stringify(datos))); 

    //lista con las categorias
    lista_categorias = []
    for (i = 0; i < datos_array.length; i++){
        lista_categorias.push(datos_array[i].name)
        for(j =0; j <datos_array[i].products.length;j++){
            lista_productos.push(datos_array[i].products[j])   
        }
    }

    //crea la fila con las categorias
    crear_categorias(lista_categorias)


    //crea visualizacion productos
    console.log(datos_array[0].products)
    console.log(lista_productos)
    console.log(lista_categorias)

})


//Crear tabla de una fila con los nombres de las categorias
function crear_categorias(arreglo){
    const fila_cat = document.getElementById("categorias")
    for (i=0; i<arreglo.length; i++){
        let columna = document.createElement("th")
        let cat = document.createTextNode(arreglo[i])
        columna.appendChild(cat)

        fila_cat.appendChild(columna)
        } 
    }

//Crea donde el titulo es el nombre de la categoria y muestra los productos
function mostrar_cat_productos(arreglo){   
    const tabla = document.getElementById("tbodyC")
    
    //Titulo
    let producto_titulo = document.createElement("h2")
    producto_titulo.innerHTML="Productos"
    tabla.appendChild(producto_titulo);

    //crear filas con los productos de la categoria
    for (let i = 0; i < arreglo.length; i++){
        let fila = document.createElement("tr") // Crea una fila para cada dato
        for (col = 0; col < 2; col++){
            let columna = document.createElement("td")
            if (col == 0){
                let nombre_prod = document.createTextNode(arreglo[i].name) 
                columna.appendChild(nombre_prod) 
            }
            if (col==1){
                //agrega el boton para añadir al carrito
                let agregar_carro = document.createElement("button");
                agregar_carro.classList.add('boton_agregar_carrito');

                //asigna id al boton con base al nombre del producto
                agregar_carro.id=arreglo[i].name


                agregar_carro.textContent ="agregar"
                agregar_carro.style.width ='80px'
                agregar_carro.style.height ='50px'
                columna.appendChild(agregar_carro)
            }
            
         
        fila.appendChild(columna);
            
        
        }
    tabla.appendChild(fila);
    }}
    

let texto_items = document.getElementById("textoitem")

//Muestra los productos de la categoria seleccionada
function mostrar_productos_categorica(event){
    
    //eilimar la tabla del producto anteriormente seleccionado
    var tabla_anterior = document.getElementById('tbodyC');
    tabla_anterior.innerHTML=''

    //Categoria seleccionada
    var categoria_selec =event.target
    
    for (i=0; i<lista_categorias.length;i++){
        if(lista_categorias[i]==categoria_selec.textContent){
            //console.log(categoria_selec)
            mostrar_cat_productos(datos_array[i].products)
        }
    }
    
    console.log(categoria_selec)

    //agregar items al contador del carrito
    let boton_selec_list = document.getElementsByClassName("boton_agregar_carrito")
    console.log(boton_selec_list)

    for(j =0; j<boton_selec_list.length;j++){
        boton_selec_list[j].addEventListener("click",function(e){
            //agrega el producto a la lista del carrito
            items_carrito_producto.push(e.target.id)

            //actualiza el numero de items
            actualizar_items()
            console.log(items_carrito_producto)
        })
    }

}

//actualizar items carrito
function actualizar_items(){
    items_carrito++
    texto_items.textContent=items_carrito + " items"
     
}

function armar_info_pedido(arreglo_pedido){
    //eilimar la tabla donde se muestra los productos de la categoria
    var info_pedido = document.getElementById('tbodyC');
    info_pedido.innerHTML=''


    //Titulo
    let carrito_titulo = document.createElement("h2")
    carrito_titulo.innerHTML="Order Detail"
    info_pedido.appendChild(carrito_titulo);
 
    //headings carrito
    let fila_headings = document.createElement("tr")

    let item = document.createElement("th")
    item.innerHTML='Item'
    let qty = document.createElement("th")
    qty.innerHTML='Qty'
    let descrpcion = document.createElement("th")
    descrpcion.innerHTML='Description'
    let unit_price = document.createElement("th")
    unit_price.innerHTML='Unit price'
    let amount = document.createElement("th")
    amount.innerHTML='Amount'
    let mod = document.createElement("th")
    mod.innerHTML='Modify'

     //headings      
    fila_headings.appendChild(item);
    fila_headings.appendChild(qty);
    fila_headings.appendChild(descrpcion);
    fila_headings.appendChild(unit_price);
    fila_headings.appendChild(amount);
    fila_headings.appendChild(mod);

    info_pedido.appendChild(fila_headings);
    //crear filas con los productos de la categoria
    let productos_repetidos=[];
    let total_pedido_precio = 0;
    for (let i = 0; i < arreglo_pedido.length; i++){
        //si el producto ya se sumo, salteselo
        if(productos_repetidos.includes(arreglo_pedido[i])){continue}


        let fila = document.createElement("tr") // Crea una fila para cada dato

        //Encontrar el precio del producto
        let precio_producto=0;
        for (k = 0; k < lista_productos.length; k++){
            if(arreglo_pedido[i]==lista_productos[k].name){
                precio_producto=lista_productos[k].price
            }
        }
        //encontrar la cantidad pedida
        let cantidad_ped=0;
        for(z =0; z < arreglo_pedido.length; z++){
            if (arreglo_pedido[z]==arreglo_pedido[i]){cantidad_ped++}
            
        }
        if (cantidad_ped > 1){
            productos_repetidos.push(arreglo_pedido[i])
        }

        for (col = 0; col < 6; col++){
            let columna = document.createElement("td")
            if (col == 0){
                let num_item = document.createTextNode(i+1) 
                columna.appendChild(num_item) 
            }
            if (col==1){
                let quantity= document.createTextNode(cantidad_ped) 
                columna.appendChild(quantity) 
            }
            if (col == 2){
                let nombre_prod = document.createTextNode(arreglo_pedido[i]) 
                columna.appendChild(nombre_prod) 
            }
            if (col == 3){
                let precio = document.createTextNode(precio_producto) 
                columna.appendChild(precio) 
            }
            if (col == 4){
                let total_pedido = document.createTextNode(precio_producto*cantidad_ped) 
                total_pedido_precio +=parseInt(total_pedido.data)
                
                columna.appendChild(total_pedido) 
            }

            if (col==5){
                //agrega el boton para aumentar el producto
                let add = document.createElement("button");
                add.id="a"+arreglo_pedido[i]
                add.classList.add('add_product');
                add.textContent ="+"

                columna.appendChild(add)

                //agrega el boton para disminuir el producto
                let less = document.createElement("button");
                add.id="r"+arreglo_pedido[i]
                less.classList.add('less_product');
                less.textContent ="-"
                columna.appendChild(less)
            }


         
        fila.appendChild(columna);
            

        
        }
    info_pedido.appendChild(fila);

    //let adicionar_list =document.getElementsByClassName("add_product")
    //modificar_orden(adicionar_list,arreglo_pedido)

    }

    let cont = document.getElementById("Contenido")

    cont.innerHTML =''
    let fila_final = document.createElement("div")   
    fila_final.classList="row"
    //precio final
    let total_mostrar = document.createElement("div")
    total_mostrar.classList="col-6"
    //total_mostrar.id="total_carrito"
    let contenido_total =document.createElement("p")
    console.log(total_pedido_precio)
    contenido_total.innerHTML = "Total: $" + total_pedido_precio

    total_mostrar.appendChild(contenido_total)
    

    //botones cancel y confirm
    let botones = document.createElement("div")
    botones.id='botones'
    botones.classList="col-6"
    let boton_cancel =document.createElement("button")
    let boton_confirm =document.createElement("button")
    boton_cancel.id="boton_cancel"
    boton_confirm.id="boton_confirm"

    boton_cancel.innerHTML='cancel'
    boton_confirm.innerHTML='confirm'

    botones.appendChild(boton_cancel)
    botones.appendChild(boton_confirm)

    fila_final.appendChild(total_mostrar)
    fila_final.appendChild(botones)

    cont.appendChild(fila_final)

}

//Modificar pedido
function modificar_orden(lista_adicion,arreglo){
    for(j =0; j<lista_adicion.length;j++){
        lista_adicion[j].addEventListener("click",function(e){
            let nombre_producto = e.target.id
            arreglo.push(nombre_producto.slice(1))
        })
    }

    armar_info_pedido(arreglo)

}
//Manejo de eventos

//Ver productos categoria
const categorias_menu = document.getElementById("categorias");
categorias_menu.onclick = mostrar_productos_categorica

//Anadir productos al carrito
const carrito = document.getElementById("imagenCarrito");
carrito.addEventListener("click",()=>{
    armar_info_pedido(items_carrito_producto)
    let adicionar_list =document.getElementsByClassName("add_product")
    modificar_orden(adicionar_list,items_carrito_producto)
})







/*


    */