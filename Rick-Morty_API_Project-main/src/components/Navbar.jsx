import  React,{ useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">My Logo</div>
            <button className="toggle-button" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><Link onClick={toggleMenu} to="/">Home</Link></li>
                <li><Link onClick={toggleMenu} to="/project_details">Project Details</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
