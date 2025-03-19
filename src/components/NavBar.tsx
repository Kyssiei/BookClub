import logoImage from '../assets/logoImage.png'


const NavBar = () => {

    return(
        <nav className="sticky-nav" style={{display: "flex", justifyContent: "space-around"}}>
            <a href="">Home</a>
            <a href="#">About</a>
            <img id="Logo" src={logoImage} alt="" />
            <a href="#">Join</a>
            <a href="#">Books</a>
            {/* <a href="#"></a> */}
        </nav>
    )
    
}

export default NavBar