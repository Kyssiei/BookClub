import logoImage from '../assets/logoImage.png'
import { Link } from 'react-router-dom'
import "../styles/NavBar.css"



const NavBar = () => {

    return(
        <nav className='sticky-nav'>
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link> 
            <img id='Logo' src={logoImage} alt="" /> 
            <Link to="/bookclub">Book Club</Link> 
            <Link to="/login">Login</Link>
            {/* <Link to="/profile">User Profile</Link> */}
      </nav>
    )
    
}

export default NavBar