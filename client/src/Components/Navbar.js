import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => ({
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light" style={{ "background-color": "#e3f2fd" }}>
                    <i class="fas fa-laptop-code"></i>&nbsp;
                <NavLink className="navbar-brand" to="/">DevSpace
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div >
        );
    }
})

export default Navbar;