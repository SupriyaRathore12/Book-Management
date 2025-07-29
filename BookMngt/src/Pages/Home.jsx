import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaHeart } from 'react-icons/fa';  // 'fa' = FontAwesome

const Home = () => {
    
    // create a state variable to store the books
    let favBook = JSON.parse(localStorage.getItem("fav-books")) || [];


    // add styles to the button
    let style = {
        margin: "10px",
        border: "none",
        background: "lightblue",
        borderRadius: "5px",
        fontFamily: "unset",
        letterSpacing: "1px",
        marginLeft: "10px"
    };
    let storedBooks = JSON.parse(localStorage.getItem("book-data")) || [];

    // set the state of the books
    const [book, setBooks] = useState(storedBooks);

    // remove books
    function removeHandler(bookName) {
        const bookLeft = book.filter((data) => data.name !== bookName)
        setBooks(bookLeft)
        localStorage.setItem("book-data", JSON.stringify(bookLeft));
    };

    // Add Favorite books
    const favHandler = (book) => {

        const isAlreadyFav = favBook.find((b) => b.name === book.name);

        if (isAlreadyFav) {
            toast.warning("Already in Favorites")
            return;
        }
            const updateFavBook = [...favBook, book];
            localStorage.setItem("fav-books",
                JSON.stringify(updateFavBook));
            toast.success("Book added to Fav")
    }
    return (
        <div>
            <h3 style={{ textAlign: "center", margin: "10px", fontFamily: "serif" }}>Book Collections</h3>
            {
                book.length === 0 ? (
                    <p>No books available yet...</p>)
                    :
                    (
                        <div 
                            style={
                                {
                                    display: "flex",
                                    flexWrap: "wrap",
                                    // justifyContent: "space-around",
                                }
                            }
                        >
                            {book.map((data) => {
                                return <div
                                    key={data.id}
                                    style={
                                        {
                                            border: "1px solid lightblue",
                                            margin: "10px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "280px",
                                            textAlign: "center",
                                            borderRadius: "10px",
                                            marginLeft: "15px",
                                        }
                                    }
                                >
                                    <img
                                        src={data.image}
                                        alt={data.name}
                                        style={
                                            {
                                                width: "120px",
                                                border: "none",
                                                margin: "10px",
                                                borderRadius: "10px",
                                            }
                                        }
                                    />
                                    <h2
                                        style={
                                            {
                                                fontFamily: "sens-serif",
                                                fontSize: "24px",
                                                margin: "0",
                                            }
                                        }>
                                        {data.name}
                                    </h2>
                                    <p
                                        style={
                                            {
                                                margin: "0",
                                                fontFamily: "cursive",
                                                fontSize: "15px",
                                                fontWeight: "100",
                                                color: "#585858",
                                            }
                                        }>
                                        {data.author}
                                    </p>
                                    <p
                                        style={
                                            {
                                                fontFamily: "cursive",
                                                color: "gray",
                                                fontSize: "12px",
                                            }
                                        }>
                                        {data.description}
                                    </p>
                                    <div
                                        style={
                                            {
                                                display: "flex",
                                                justifyContent: "center",
                                                margin: " 0 10px",
                                                width: "100%",
                                                padding: "5px",
                                            }
                                        }
                                    >
                                        <button style={style}>Update</button>
                                        <button onClick={() => removeHandler(data.name)} style={style}>Remove</button>
                                    </div>
                                        {/* <button onClick={()=> favHandler(data)} style={style}>add to fav</button> */}
                                        <FaHeart 
    onClick={() => favHandler(data)} 
    style={{ 
        color: 'red', 
        fontSize: '24px', 
        margin: '10px', 
        cursor: 'pointer' 
    }}
/>
<span style={{ color: 'black', fontSize: '16px' }}>Add to Fav</span>
    
                                </div>
                            })}
                        </div>
                    )
            }
            <ToastContainer position="top-center" theme="light" autoClose="1500" />
        </div >
    );
}

export default Home;