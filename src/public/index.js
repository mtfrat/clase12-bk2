const socket = io()
let form = document.getElementById('form')
let title = document.getElementById('title')
let price = document.getElementById('price')
let thumbnail = document.getElementById('thumbnail')

Swal.fire({
    title:"Log In",
    input:"text",
    text:"Ingresa tu mail",
    inputValidator:(value)=>{
        return !value && "Por favor ingresa tu mail para continuar"
    },
    allowOutsideClick:false
}).then(result=>{
    user = result.value
})

socket.on('newUser',(data)=>{
    Swal.fire({
        icon:"success",
        text:"Usuario nuevo encontrado",
        toast:true,
        position:"top-right"
    })
})

form.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        socket.emit('message',{title:title.value, price:price.value, thumbnail: thumbnail.value})
    }
})

socket.on('products', data =>{
    let products = document.getElementById('loggedProducts')
    let totalProducts = ""
    data.forEach(products => {
        totalProducts += `  <div style="margin:3px">
                                Producto: ${products.title}
                            </div>
                            <div style="margin:3px">
                                Precio: ${products.price}
                            </div>
                            <div style="margin:5px">
                                <img src="${products.thumbnail}">
                            </div>`
    })
    products.innerHTML = totalProducts
})
