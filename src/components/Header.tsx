import img from '../assets/books.jpg'
// import backgroundImg from "../assets/sky.png"


const Header = () => {

    return(
        <div style={{
            display:"flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundSize: "cover",
            backgroundPosition: "center",
            
            }}>
            <div>
                <h1 id="Header">Books <br/> that <br/>Inspire!</h1>
                <p id="HeaderP">join our book club</p>
            </div>
            <div>
                <img style={{height:"700px"}} src={img} alt="" />

            </div>
        </div>
    )
    
}

export default Header