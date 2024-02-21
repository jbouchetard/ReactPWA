// import logo from './logo.svg';

import './App.css';
import Home from './pages/Home.js';
import React from 'react';
import MyShop from './pages/MyShop.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorMessage from './pages/ErrorMessage.js';
import Details from './pages/Details.js';
import { useEffect } from 'react';
import { useState } from "react";
import { useRef } from "react";
import Bookmarks from './pages/Bookmarks.js';
import BookmarksContext from './pages/BookmarksContext.js';


function App() {
  const [bookmarks, setBookmarks] = useState([
    {
      slug: "super-mario-bros-3",
      name: "Super Mario Bros. 3",
      background_image:
        "https://media.rawg.io/media/screenshots/092/092fc1910f067a95a07c0fbfd"
    },
    {
      slug: "the-legend-of-zelda-the-wind-waker",
      name: "The Legend of Zelda: The Wind Waker",
      background_image:
        "https://media.rawg.io/media/games/45f/45f6d31b0fcefe029e33d258a7beb6a"
    }
  ]);

  // Création du routeur
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorMessage />,
    }, { basename: "/ReactPWA"},
    {
      path: "/details/:slug",
      element: <Details />,
    },
    // On ajoute cette route
    {
      path: "/bookmarks",
      element: <Bookmarks />,
    },
    {
      path: "/MyShop",
     element: <MyShop />
    },
  ], { basename: "/" })
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    if (dataLoaded) {
      console.log("Sauvegarde:", bookmarks)
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks])
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(savedBookmarks);
    console.log("Chargement:", savedBookmarks);
    setDataLoaded(true);
  }, [])

  const [install, setInstall] = useState(false);

  const deferredPrompt = useRef(null); // Utiliser useRef pour conserver deferredPrompt à travers les re-rendus
useEffect(() => {
const handler = (e) => {
e.preventDefault();
deferredPrompt.current = e; // Stocker l'événement dans la propriété.current de la ref
console.log("Change prompt", deferredPrompt)
setInstall(true);
};
// On place l'eventListener au démarrage
window.addEventListener('beforeinstallprompt', handler);
return () => {
// On retire l'eventListener à la fermeture
window.removeEventListener('beforeinstallprompt', handler);
};
}, []);
const handleInstall = () => {
deferredPrompt.current.prompt();
deferredPrompt.current.userChoice.then((choiceResult) => {
if (choiceResult.outcome === 'accepted') {
alert("Merci d'avoir installé l'application !")
} else {
console.log('L\'utilisateur a refusé l\'installation');
}
deferredPrompt.current = null;
});
setInstall(false);
}

useEffect(() => {
  const handler = (e) => {
  e.preventDefault();
  setInstall(e.prompt);
  };
  window.addEventListener('beforeinstallprompt', handler);
  return () => {
  window.removeEventListener('beforeinstallprompt', handler);
  };
  }, []);


  return (
    <BookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
    {install && (
    <div className="bg-gray-300 shadow-gray-700 p-4 flex items-center">
    <div className='flex-grow text-center'>Voulez-vous installer
    l'application sur votre appareil ?</div>
    <button className="px-4 py-2 rounded text-white bg-teal-600" onClick=
    {handleInstall}>Installer</button>
    </div>
    )}
    <RouterProvider router={router}></RouterProvider>
    </BookmarksContext.Provider>
    );
    


}

export default App;
