import React, {useEffect, useState} from 'react';
import axios from "axios";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
// https://pokeapi.co/

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    let cancel;
    setLoading(true);
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name));
    });
    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl);
  }

  if(loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination gotoNextPage={nextPageUrl ? gotoNextPage : null} gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
    </>
  );
}
