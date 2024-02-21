import React, { useContext } from "react";
import BookmarksContext from './BookmarksContext.js';
import { Link } from "react-router-dom";


const Bookmarks = () => {
    const { bookmarks, setBookmarks } = useContext(BookmarksContext);

    const deleteBookmarks = (index) => {
        const tmpBookmarks = [...bookmarks];
        tmpBookmarks.splice(index, 1);
        setBookmarks(tmpBookmarks);
    }

    return (
        <>
            <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
                {bookmarks.map((bookmark, index) => (
                    <li className="py-2 px-4 border-b border-gray-500" key={index}>
                        <button onClick={() => { deleteBookmarks(index) }}>🗑</button>
                        {bookmark.name}</li>
                ))}
            </ul>
            <div className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl font-bold flex-grow text-white">
                <Link to={'/Home'}>Accueil</Link>
            </div>

        </>
    )
}
export default Bookmarks;
