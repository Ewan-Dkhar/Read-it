import React from "react";
import "../styles/Categories.css";

const genresList = [
    { name: "Fiction", img: "https://th.bing.com/th/id/OIP.fFS7Dq3D7HHy-l4ckta11wHaJQ?w=208&h=260" },
    { name: "Thriller", img: "https://www.werd.com/wp-content/uploads/2024/04/best-horror-novels.jpg" },
    { name: "Fantasy", img: "https://tse4.mm.bing.net/th/id/OIP.C5JV3TVSEr9N3U1L-n0yTQHaJ4?w=184&h=245" },
    { name: "Romance", img: "https://th.bing.com/th/id/OIP.8YnREBcZBne2doc1tEzxNwHaHa?w=185&h=185" },
    { name: "Science", img: "https://th.bing.com/th/id/OIP.mKahwbC4f5LX-N4DlmKy3wHaHa?w=208&h=208" },
    { name: "Personal Development", img: "https://tse1.mm.bing.net/th/id/OIP.Ya2NmLSWIQNriUCgG2pzsQHaJ3?w=184&h=245" }
];

function Categories() {
    return (
        <section className="categories">
            <h1 className="my-2">Genres</h1>

            <div className="container-1">
                <div className="card-container">

                    {genresList.map((g, i) => (
                        <div className="card" key={i}>
                            <img src={g.img} width="280" height="350" />
                            <div className="overlay">{g.name}</div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default Categories;