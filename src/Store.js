import swal from 'sweetalert';
import { observable, action, decorate, toJS } from 'mobx';
import { createContext } from 'react';

class Store {
  constructor() {
    this.pokemonsCount = 964;
    this.pokemons = [];
    this.types = [];
    this.page = 1;
    this.pageSize = 10;
    this.loading = false;
    this.names = [];

    this.indicator = 'getPokemons';
    this.storedData = [];

    this.getTypes();
    this.getNames();
    this.getPokemons(this.pageSize, this.page * this.pageSize - this.pageSize);
  };

  getTypes = async () => {
    const responce = await fetch('https://pokeapi.co/api/v2/type');
    const data = await responce.json();
    this.types = data.results.slice(0, data.results.length - 2);
  };

  getNames = async () => {
    const responce = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=964');
    const data = await responce.json();
    let names = [];
    for (const item of data.results) {
      names.push({ value: item.name });
    }
    this.names = names;
  };

  setPokemon = (data) => {
    let pokemon = {};
    pokemon.id = data.id;
    pokemon.name = data.name;
    pokemon.avatarUrl = `./react-test-task/pokemonAvatars/${data.name}.png`;
    pokemon.height = data.height;
    pokemon.weight = data.weight;
    pokemon.types = [];
    for (const item of data.types) {
      for (const type of this.types) {
        if (item.type.name === type.name) {
          pokemon.types.push({ name: item.type.name });
          break;
        }
      }
    }
    pokemon.abilities = [];
    for (const item of data.abilities) {
      pokemon.abilities.push({ name: item.ability.name });
    }
    pokemon.stats = [];
    for (const item of data.stats) {
      pokemon.stats.push({ name: item.stat.name, base_stat: item.base_stat });
    }
    return pokemon;
  };

  getPokemons = async (limit, offset) => {
    this.indicator = 'getPokemons';
    this.loading = true;
    const responce = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await responce.json();
    this.pokemonsCount = 964;
    let pokemons = [];
    for (const item of data.results) {
      const responceForEach = await fetch(`${item.url}`);
      const pokemonData = await responceForEach.json();
      pokemons.push(this.setPokemon(pokemonData));
    }
    this.loading = false;
    this.pokemons = pokemons;
  };

  getPokemonByName = async (name) => {
    name = name.toLowerCase();
    this.page = 1;
    if (name === '') {
      return this.getPokemons(this.pageSize, this.page * this.pageSize - this.pageSize);
    }
    this.loading = true;
    const responce = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (responce.status === 404) {
      swal('Ooops!', 'No pokemon matched your search :( Try again!', 'error');
      return this.getPokemons(this.pageSize, this.page * this.pageSize - this.pageSize);
    } else {
      const data = await responce.json();
      this.loading = false;
      this.pokemons = [this.setPokemon(data)];
      this.pokemonsCount = this.pokemons.length;
    }
  };

  getPokemonsByTypes = async (types) => {
    this.indicator = 'getPokemonsByTypes';
    this.page = 1;
    if (types.length === 0) {
      return this.getPokemons(this.pageSize, this.page * this.pageSize - this.pageSize);
    }
    this.loading = true;
    let pokemons = [];
    for (const type of types) {
      const responce = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await responce.json();
      for (const item of data.pokemon) {
        const responceForEach = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.pokemon.name}`);
        const pokemonData = await responceForEach.json();
        pokemons.push(this.setPokemon(pokemonData));
      }
    }
    pokemons = pokemons.filter(item => item.id <= 964);
    const pokemonsJSONObject = pokemons.map(JSON.stringify);
    pokemons = [...new Set(pokemonsJSONObject)].map(JSON.parse);
    this.loading = false;
    this.storedData = pokemons;
    this.pokemons = pokemons.slice(this.page * this.pageSize - this.pageSize, this.page * this.pageSize);
    this.pokemonsCount = this.storedData.length;
  };

  getSlicedPokemonsByTypes = (page, pageSize) => {
    this.pokemons = this.storedData.slice(page * pageSize - pageSize, page * pageSize);
  };

  paginationHandleChange = (page, pageSize) => {
    this.page = page;
    this.pageSize = pageSize;
    switch (this.indicator) {
      case 'getPokemons':
        this.getPokemons(pageSize, page * pageSize - pageSize);
        break;
      case 'getPokemonsByTypes':
        this.getSlicedPokemonsByTypes(page, pageSize);
        break;
    };
  };
};

decorate(Store, {
  pokemonsCount: observable,
  pokemons: observable,
  page: observable,
  pageSize: observable,
  loading: observable,
  indicator: observable,
  storedData: observable,
  getPokemons: action,
  getPokemonByName: action,
  getPokemonsByTypes: action,
  getSlicedPokemonsByTypes: action,
  paginationHandleChange: action
});

const store = new Store();
export const storeContext = createContext(store);