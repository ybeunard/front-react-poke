import React, {Component} from "react";
import './Header.scss'
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <section className="header">
                    <h1 className="header-title">
                        <Link to="/">Excilys Cocktails</Link>
                    </h1>

                <div className="header-links">
                    <div>
                        <Link to="/recipes/add">New cocktail</Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default Header;
