const poke_container = document.getElementById('poke-container');
const pokemon_count = 150
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const APIURL = `https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"`;

axios.get(APIURL)
    .then((response) => {
      if(response.status === 200){
        const pokemonList = response.data.results;

        for (let i = 0; i < pokemonList.length; i++) {
        const pokemonUrl = pokemonList[i].url;
        
        
        axios.get(pokemonUrl)
          .then((response) => {

            const pokemonData = response.data;
          
            console.log(pokemonData);

            let pokeType = '';
            for (let j = 0; j < pokemonData.types.length; j++) {
              pokeType += pokemonData.types[j].type.name + ', ';
            }
              // Eliminar la última coma y espacio
              pokeType = pokeType.slice(0, -2); 
              // Obtener el color según el primer tipo
              const cardColor = colors[pokemonData.types[0].type.name.toLowerCase()]; 

            poke_container.innerHTML += 
            '<div class="pokemon" style="background-color:' + cardColor + '">' +
              '<div class=img-container>'+
                '<img src="'+ pokemonData.sprites.front_default+ '">'+
              '</div>'+
              '<div class="info">'+ pokemonData.id +
                '<h3 class="name">'+ pokemonData.name + '</h3>'+
                '<small class="type">' + "Type: " + pokeType +
                '<span></span></small></div>' +
              "</div>";
        })

    .catch(error => {
    console.log("Error: No se pueden obtener los datos", error);
  });
    }
  }
})
        