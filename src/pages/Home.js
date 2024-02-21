import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Bookmarks from './Bookmarks.js';
import BookmarksContext from "./BookmarksContext";
import { useContext } from "react";



const Home = () => {
   const [searchText, setSearchText] = useState('');
   // On utilise un state pour garder nos données
   const [games, setGames] = useState([

   ]);
   const handleSearch = (e) => {
      e.preventDefault();
      const apiKey = '098c497551cf45a4bf74aef1bf9fca74';
      const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`;
      //const url = "/games-api-fallback/games/";
      fetch(url)
         .then(response => response.json())
         .then(data => { setGames(data.results) })
         .catch(() => { alert('Une erreur est survenue') })
   }

   const { bookmarks, setBookmarks } = useContext(BookmarksContext);




   const addBookmarks = (game) => {
      if (idBookMarks(game.id)) {
         const index = bookmarks.indexOf(game);
         const tmpBookmarks = [...bookmarks];
         tmpBookmarks.splice(index, 1);
         setBookmarks(tmpBookmarks);
      } else {
         const tmpBookmarks = [...bookmarks];
         tmpBookmarks.push(game);
         setBookmarks(tmpBookmarks);
      }
   }

   const idBookMarks = (id) =>
      !!(bookmarks.find((bookmarks) =>
         bookmarks.id === id
      ));

   return (
      <> {/* Un fragment doit être ajouté pour ne retourner qu'un seul
composant */}


         <form className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl"
            onSubmit={handleSearch} >
            <input type="text" className="form-control" autoFocus={true}
               onInput={e => { setSearchText(e.target.value) }}
               value={searchText}
               placeholder='Rechercher' />
            <button type="submit" className="bg-blue-700 rounded-r
text-white px-4 py-2">Rechercher</button>
         </form>
         {/* Ajoutons notre liste */}
         <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
            {games.map(game => (
               <li className="py-2 px-4 border-b border-gray-500" key=
                  {game.id} >

                  <Link to={`/details/${game.slug}`} className="flex">
                     <img src={game.background_image} alt="" className="w-24 pr2" />
                     <div className="text-2xl font-bold flex-grow">{game.name}
                     </div>
                     <div>{game.rating}</div>
                  </Link>
                  <button onClick={(e) => { e.preventDefault(); addBookmarks(game) }}>{idBookMarks(game.id) ? '★' : '☆'}</button>
               </li>
            ))}
         </ul>
         <div className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl font-bold flex-grow text-yellow-500">
            <Link to={'/Bookmarks'}>Favoris</Link>
         </div>
         <div className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl font-bold flex-grow text-blue-500">
            <Link to={'/MyShop'}>Votre magasin</Link>
         </div>
      </>
   );
}
export default Home;