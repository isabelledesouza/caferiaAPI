import carta from "./lacarta/carta.js";

const container = document.querySelector('.container-cards');

carta.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = 'Imagen del producto';
    img.className = 'card-product';
    
    const h3 = document.createElement('h3');
    h3.textContent = item.name;
    
    const p = document.createElement('p');
    p.textContent = 'Descripción del producto';
    
    const button = document.createElement('button');
    button.textContent = 'Ver más';
    
    card.append(img, h3, p, button);
    container.appendChild(card);
});
