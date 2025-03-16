// import { useEffect, useRef } from "react"


const MovingBanner: React.FC = () => {
    // const bannerRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     let position = 100;
    //     const speed = 1;

    //     const moveBanner = () => {
    //         if (bannerRef.current) {
    //             position -= speed;
    //             if (position < -100){
    //                 position = 100;
    //             }
    //             bannerRef.current.style.transform = `translateX(${position}%)`
    //         }
    //     };
    //     const interval = setInterval(moveBanner,200);

    //     return () => clearInterval(interval);
    // })
    return(
        <div className="banner-container">
            <div className="banner">
                <span>Welcome to our Book Club! Join Us Today!</span>
                <span>Welcome to our Book Club! Join US Today!</span>
            </div>
        </div>
    )
    
}
export default MovingBanner