import carta from "./lacarta/carta.js";

const container = document.querySelector(".container-cards");

carta.forEach((item) => {
  const card = document.createElement("div");
  card.className = "card";

  const label = document.createElement("label");
  label.className = "";
  label.setAttribute("for", item.name.replace(/\s/g, "_"));

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = item.name.replace(/\s/g, "_"); //remplaza todx los espacios blancos

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = "Imagen del producto";
  img.className = "card-product";

  const h3 = document.createElement("h3");
  h3.textContent = item.name;

  const p = document.createElement("p");
  p.textContent = "Descripción del producto";

  const button = document.createElement("button");
  button.textContent = "Ver más";
  label.append(img, input); // Agrega la imagen dentro de la etiqueta label
  card.append(label, h3, p, button); // Agrega la etiqueta label dentro del contenedor card

  container.appendChild(card);
});

// **********CHECKBOX*****************
const cardInputs = document.querySelectorAll("input[type=checkbox]");
const containerModal = document.querySelector(".modal-f");
const btnCloseModal = document.querySelector(".closeModal");
const containerMain = document.querySelector(".container-main");
cardInputs.forEach((input) =>
  input.addEventListener("change", (e) => {
    let checked = e.target.checked;
    // Deseleccionar todos
    cardInputs.forEach((checkbox) => (checkbox.checked = false));
    // Seleccionas o des el que el usuario selecciono
    if (checked) {
      e.target.checked = true;
      console.log("El checkbox está seleccionado");
      containerModal.style.display = "block";
      containerMain.style.display = "none";
      // Obtener el objeto del producto seleccionado
      const selectedPedido = carta.find((item) => item.name.replace(/\s/g, "_") === e.target.id);
      console.log(selectedPedido);
      
     
      if (selectedPedido) {
      let order = makeAnOrder(selectedPedido);// retorna una promesa y guarda en order;

      // Aqui empiezo la animacion de servir
        order.then(result => {
          console.log({result})
          // Aqui detengo la animacion de servir y llamo la animacion de entrega el pedido
        })
        .catch(error => {
          console.log({error})
          // Aqui detengo la animacion de servir y llamo la animacion de error en el pedido
          
        });
        
       console.log(order);
      } else {
        console.log("No se encontró ningún producto con ese nombre");
      }
    } else {
      console.log("El checkbox no está seleccionado");
    }
  })
);


/***Close Modal***/
btnCloseModal.addEventListener("click", () => {
  containerModal.style.display = "none";
  containerMain.style.display = "block";
});
window.addEventListener("click", (e) => {
  if (e.target === containerModal) {
    containerModal.style.display = "none";
  }
});

/* Hacer Pedido*/
const btnHacer = document.querySelector(".btnPedido");
const vol = document.querySelector(".vol");
const cafe = document.querySelector(".cafe")
const tarjeta = document.querySelector(".tarjeta");
btnHacer.addEventListener("click", () => {
  containerModal.style.display = "none";
  tarjeta.style.display = "block";
  containerMain.style.display = "block";
  setTimeout(() => {
    vol.classList.add('vol-rotate');
  }, 2000);
  vol.addEventListener('transitionend', () => {
    setTimeout(() => {
      cafe.classList.add('cafe-derramando');
    }, 1000);
  });
  
});


function makeAnOrder(order) {
  return new Promise(function (resolve, reject) {
    let imprevistos = Math.random().toFixed(0) * 10000;
    let tiempo = order.tiempo + imprevistos;
    console.log({tiempo, imprevistos})
    // Llamas animacion loop
    setTimeout(() => {
      if (tiempo < 10000) {
        resolve(
          `Seu pedido esta listo:` +
            order.name +
            " en: " +
            tiempo / 1000 +
            "seg"
        );
      } else {
        reject("Esta demorado" + " en: " + tiempo / 1000 + "seg");
      }
    }, tiempo);
  });
}
function delivery(selectedPedido){
  if (selectedPedido) {
     let order = makeAnOrder(selectedPedido);// retorna una promesa y guarda en order;
     order.then(result => console.log({result}))
       .catch(error => console.log({error}));
        console.log(order);
   } else {
         console.log("No se encontró ningún producto con ese nombre");
       }
 }

