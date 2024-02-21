import { useParams } from "react-router-dom"
import { useEffect } from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
const Details = () => {
    const { slug } = useParams();
    const [game, setGames] = useState({ description: "" });
    useEffect(() => {
        const url = `https://api.rawg.io/api/games/${slug}?key=098c497551cf45a4bf74aef1bf9fca74`;
        //const url = `/games-api-fallback/games/${slug}`;
        fetch(url)
            .then(response => response.json())
            .then(data => { setGames(data) })
            .catch(() => { alert('Une erreur est encore survenue') })
    },)
    return (
        <>
            <p>Ceci est la page du jeu "{game.description_raw}"</p>
            <img src={game.background_image} alt="" />
            
            <div className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl font-bold flex-grow text-white">
                <Link to={'/Home'}>Accueil</Link>
            </div>
        </>
    )
}

export default Details
