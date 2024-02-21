import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import haversine from "./haversine.js";
const MyShop = () => {
    // const [localisation, setLocalisation] = useState([]);

    // useEffect(() => {
    //     const fetchLocalisation = async () => {
    //         try {
    //             const url = `https://formacitron.github.io/shopslist/shops.json`;
    //             const response = await fetch(url);
    //             if (!response.ok) {
    //                 throw new Error('Erreur réseau');
    //             }
    //             const data = await response.json();
    //             setLocalisation(data);
    //             console.log(data);

    //         } catch (error) {
    //             console.error('Erreur de chargement des données:', error);
    //             alert('Une erreur est survenue lors du chargement des données');
    //         }
    //     };

    //     fetchLocalisation();

    // }, []); // Le tableau vide en second argument signifie que ce useEffect s'exécutera une seule fois après le montage du composant


    const [myShop, setmyShop] = useState({ name: "", distance: "" });

    useEffect(() => {
        const url = `https://formacitron.github.io/shopslist/shops.json`;
        fetch(url)
            .then((response) => response.json())
            .then((shops) => {
                // console.log(shops)
    
                navigator.geolocation.getCurrentPosition((position) => {
                    const nearest = { distance: null, shop: null }
    
                    for (const shop of shops) {
                        const a = { lat: position.coords.latitude, lng: position.coords.longitude }
                        const b = { lat: shop.gps_lat, lon: shop.gps_lng }
                        const distance = haversine(a, b);
                        if (nearest.distance == null) {
                            nearest.distance = distance;
                            nearest.shop = shop;
                        } else {
                            if (nearest.distance > distance) {
                                nearest.distance = distance;
                                nearest.shop = shop;
                            }
                        }
                    }
                    setmyShop({name: nearest.shop.name, city: nearest.shop.city, distance: (nearest.distance/1000).toFixed(2)});
                });
            });
    }, []);
    



    return (
        <>
        <div className="flex flex-col h-full text-center">
        <h1 className="text-2xl text-center">{myShop.name}</h1>
            <p className="flex-grow">{myShop.city}</p>
            <p>{myShop.distance} km</p>
        </div>
       
            <div className="text-2xl font-bold flex-grow text-white">
                <Link to={'/Home'}>Accueil</Link>
            </div>
        </>
    );
}

export default MyShop