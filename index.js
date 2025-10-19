const container = document.getElementById('container');

const btnAll = document.getElementById('btn-all');
const btnAlive = document.getElementById('btn-alive');
const btnDead = document.getElementById('btn-dead');
const btnFav = document.getElementById('btn-fav');

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let currentSection = JSON.parse(localStorage.getItem("section")) || "all";

btnAll.addEventListener('click', ()=>{
    currentSection = "all";
    localStorage.setItem("section", JSON.stringify(currentSection));
    getCharacters();
})

btnAlive.addEventListener('click', ()=>{
    currentSection = "alive";
    localStorage.setItem("section", JSON.stringify(currentSection));
    getCharacters();
})

btnDead.addEventListener('click', ()=>{
    currentSection = "dead";
    localStorage.setItem("section", JSON.stringify(currentSection));
    getCharacters();
})

btnFav.addEventListener('click', ()=>{
    currentSection = "fav";
    localStorage.setItem("section", JSON.stringify(currentSection));
    renderFavorites();
})


function renderFavorites(){
    favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if(favorites.length === 0){
        container.innerHTML = "<p>No hay favoritos</p>";
        return;
    } else{
        container.innerHTML = "";
    }

    
    favorites.forEach((character) =>{
        const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h3 id="name">${character.name}</h3>
                <p>Estado: ${character.status}</p>
                <p>Especie: ${character.species}</p>
                <button id="btn-fav-${character.id}">❌ Quitar de favoritos</button>
            `
            container.appendChild(div);
            const btnAddFav = document.getElementById(`btn-fav-${character.id}`);
            btnAddFav.addEventListener('click', ()=>{
                favorites = favorites.filter(fav => fav.id !== character.id);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                Swal.fire({
                    title: "Eliminaste este personaje de tus favoritos!",
                    icon: "info"
                });
                renderFavorites();
            });
    })
}


async function getCharacters(){

    let url = `https://rickandmortyapi.com/api/character?`;

    if(currentSection === "alive"){
        url+='status=alive'
    }

    if(currentSection === "dead"){
        url+='status=dead'
    }

    if(currentSection === "fav"){
        renderFavorites();
        return;
    }
    
    
    container.innerHTML = "<p>Cargando personajes...</p>";


    try{
        const response = await fetch(url);
        const characters = await response.json()
        container.innerHTML = "";
        characters.results. forEach((character) => {
            const isFav = favorites.some(fav => fav.id === character.id);
            
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h3 id="name">${character.name}</h3>
                <p>Estado: ${character.status}</p>
                <p>Especie: ${character.species}</p>
                <button id="btn-fav-${character.id}">
                    ${isFav ? "❌ Quitar de favoritos" : "❤️ Agregar a favoritos"}
                </button>
            `
            
            container.appendChild(div);
            const btnAddFav = document.getElementById(`btn-fav-${character.id}`);
            btnAddFav.addEventListener('click', ()=>{
                const exists = favorites.some(characterFav=> characterFav.id === character.id);
                if(exists){
                    if(btnAddFav.textContent.includes("Agregar")){
                        Swal.fire({
                            title: "Ya está en favoritos!",
                            icon: "warning"
                        });
                    }


                    favorites = favorites.filter(fav => fav.id !== character.id);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                    Swal.fire({
                        title: "Eliminaste este personaje de tus favoritos!",
                        icon: "info"
                    });
                    btnAddFav.textContent = "❤️ Agregar a favoritos";
                } else{
                    favorites.push(character);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                    Swal.fire({
                        title: "Agregaste este personaje a tus favoritos!",
                        icon: "success"
                    });
                    btnAddFav.textContent = "❌ Quitar de favoritos";
                }
            });
            
        });

        
    } catch(error){
        console.error(error);
        container.innerHTML = `<p>Error al cargar los personajes 😥</p>`
    }
}

getCharacters();