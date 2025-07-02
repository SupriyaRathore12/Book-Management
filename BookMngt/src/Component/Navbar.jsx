import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
function Navbar() {
    return (

        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark p-3">

                <Link to="#" className="navbar-brand">MyBookApp</Link>
                {/* <Link to="/MyBook">MyBook</Link> */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item" >
                            <Link to="/" className="nav-link fs-5">Home</Link>
                        </li>
                        <li className="nav-item" >
                            <Link to="/mybook" className="nav-link fs-5">MyBook</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link fs-5">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link fs-5">Contact</Link>
                        </li>
                        <li className="nav-item ms-3">
                            <Link to="/login" className="btn btn-primary fs-5">Login</Link>

                        </li>
                    </ul>
                    </div>

            </nav>
        </div>
    );
}
export default Navbar;