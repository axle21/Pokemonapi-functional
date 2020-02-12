import React , { useState, useEffect } from 'react'
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';


export default function App() {

    const [pokemon , setPokemon] = useState([]);
    const [currentPageUrl , setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextPageUrl , setNextPageUrl] = useState();
    const [prevPageUrl , setPrevPageUrl] = useState();
    const [loading , setLoading] = useState(true)

    useEffect(() => {
      setLoading(true);
      let cancel;
      axios.get(currentPageUrl, {
        cancelToken: axios.CancelToken(c => cancel = c)
      })
      .then(res => { 
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        setPokemon(res.data.results.map(p => p.name)) 
        setLoading(false)
      })

      return () => cancel()

    }, [currentPageUrl]);

    function goTonextPageUrl(){
      setCurrentPageUrl(nextPageUrl)
    }

    function goToPrevPageUrl(){
      setCurrentPageUrl(prevPageUrl)
    }
    
    if(loading) return "loading..."

    return (
            <>
            <PokemonList pokemon={pokemon} />
            <Pagination
            gotoNextPage={nextPageUrl ? goTonextPageUrl : null}
            gotoPrevPage={prevPageUrl ? goToPrevPageUrl : null}
             />
            </>
    )
}
