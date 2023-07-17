import React from "react"

const Footer = () => {
   return (
       <>
       <footer className="footer p-10 bg-base-300 text-base-content">
            <div> 
                <span className="footer-title"> 
                  Attribution 
                </span>
                <a href="https://storyset.com/work">Work illustrations by Storyset</a>
                <a href="https://storyset.com/people">People illustrations by Storyset</a>
                <p>icons by <a href="https://icons8.com">Icons8</a></p> 
            </div> 
            <div className="justify-self-end"> 
                <span className="footer-title">
                   Made with &#10084; by
                </span>
                 <div className="flex flex-row gap-2 items-center">
                    <a href="https://www.linkedin.com/in/arminpatel/">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="32px" height="32px"><rect width="50" height="50" x="7" y="7" fill="#58b5e8" rx="6" ry="6"/><path fill="#faefde" d="M19.5 19A3.5 3.5 0 1 0 19.5 26 3.5 3.5 0 1 0 19.5 19zM39.76 28c-2.21 0-5 1.78-6.19 2.79V29.46a1 1 0 0 0-1-1H27.48a1 1 0 0 0-1 1v21a1 1 0 0 0 1 1h5.4a1 1 0 0 0 1-1V39.88c0-3.16 1.78-5.34 3.89-5.34s3.37 2.39 3.37 5.51V50.48a1 1 0 0 0 1 1h5.4a1 1 0 0 0 1-1V38.77C48.4 33.44 47.37 28 39.76 28zM16 29H23V51H16z"/><path fill="#65c5ef" d="M11,7H53a4,4,0,0,1,4,4v0a3,3,0,0,1-3,3H10a3,3,0,0,1-3-3v0a4,4,0,0,1,4-4Z"/><path fill="#8d6c9f" d="M23 28H16a1 1 0 0 0-1 1V51a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V29A1 1 0 0 0 23 28zM22 50H17V30h5zM39.88 27.44a8.47 8.47 0 0 0-5.44 1.88V29a1 1 0 0 0-1-1H27a1 1 0 0 0-1 1V51a1 1 0 0 0 1 1h6.7a1 1 0 0 0 1-1V39.89c0-3.31.82-4.55 3-4.55s2.49 1.46 2.49 4.72V51a1 1 0 0 0 1 1h6.71a1 1 0 0 0 1-1V38.72C48.92 33.14 47.85 27.44 39.88 27.44zm7 22.56H42.21V40.06c0-2.35 0-6.72-4.49-6.72-5 0-5 4.93-5 6.55V50H28V30h4.43v2a1.08 1.08 0 0 0 1.09 1 1 1 0 0 0 .88-.53 6.07 6.07 0 0 1 5.46-3c5.87 0 7 3.55 7 9.29zM19.5 18A4.5 4.5 0 1 0 24 22.5 4.5 4.5 0 0 0 19.5 18zm0 7.33a2.83 2.83 0 1 1 2.83-2.83A2.83 2.83 0 0 1 19.5 25.33z"/><path fill="#8d6c9f" d="M51,6H13a7,7,0,0,0-7,7V51a7,7,0,0,0,7,7H51a7,7,0,0,0,7-7V13A7,7,0,0,0,51,6Zm5,45a5,5,0,0,1-5,5H13a5,5,0,0,1-5-5V13a5,5,0,0,1,5-5H51a5,5,0,0,1,5,5Z"/><path fill="#8d6c9f" d="M17 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 17 16zM12 12a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V13A1 1 0 0 0 12 12zM32 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 32 16zM37 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 37 16zM42 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 42 16zM47 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 47 16zM52 12a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V13A1 1 0 0 0 52 12zM22 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 22 16zM27 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 27 16z"/></svg>
                    </a>
                    <span className="text-sm">Armin</span>  
                    <span className="text-base"> & </span>
                    <a href="https://www.linkedin.com/in/tdivyansh/">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="32px" height="32px"><rect width="50" height="50" x="7" y="7" fill="#58b5e8" rx="6" ry="6"/><path fill="#faefde" d="M19.5 19A3.5 3.5 0 1 0 19.5 26 3.5 3.5 0 1 0 19.5 19zM39.76 28c-2.21 0-5 1.78-6.19 2.79V29.46a1 1 0 0 0-1-1H27.48a1 1 0 0 0-1 1v21a1 1 0 0 0 1 1h5.4a1 1 0 0 0 1-1V39.88c0-3.16 1.78-5.34 3.89-5.34s3.37 2.39 3.37 5.51V50.48a1 1 0 0 0 1 1h5.4a1 1 0 0 0 1-1V38.77C48.4 33.44 47.37 28 39.76 28zM16 29H23V51H16z"/><path fill="#65c5ef" d="M11,7H53a4,4,0,0,1,4,4v0a3,3,0,0,1-3,3H10a3,3,0,0,1-3-3v0a4,4,0,0,1,4-4Z"/><path fill="#8d6c9f" d="M23 28H16a1 1 0 0 0-1 1V51a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V29A1 1 0 0 0 23 28zM22 50H17V30h5zM39.88 27.44a8.47 8.47 0 0 0-5.44 1.88V29a1 1 0 0 0-1-1H27a1 1 0 0 0-1 1V51a1 1 0 0 0 1 1h6.7a1 1 0 0 0 1-1V39.89c0-3.31.82-4.55 3-4.55s2.49 1.46 2.49 4.72V51a1 1 0 0 0 1 1h6.71a1 1 0 0 0 1-1V38.72C48.92 33.14 47.85 27.44 39.88 27.44zm7 22.56H42.21V40.06c0-2.35 0-6.72-4.49-6.72-5 0-5 4.93-5 6.55V50H28V30h4.43v2a1.08 1.08 0 0 0 1.09 1 1 1 0 0 0 .88-.53 6.07 6.07 0 0 1 5.46-3c5.87 0 7 3.55 7 9.29zM19.5 18A4.5 4.5 0 1 0 24 22.5 4.5 4.5 0 0 0 19.5 18zm0 7.33a2.83 2.83 0 1 1 2.83-2.83A2.83 2.83 0 0 1 19.5 25.33z"/><path fill="#8d6c9f" d="M51,6H13a7,7,0,0,0-7,7V51a7,7,0,0,0,7,7H51a7,7,0,0,0,7-7V13A7,7,0,0,0,51,6Zm5,45a5,5,0,0,1-5,5H13a5,5,0,0,1-5-5V13a5,5,0,0,1,5-5H51a5,5,0,0,1,5,5Z"/><path fill="#8d6c9f" d="M17 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 17 16zM12 12a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V13A1 1 0 0 0 12 12zM32 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 32 16zM37 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 37 16zM42 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 42 16zM47 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 47 16zM52 12a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V13A1 1 0 0 0 52 12zM22 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 22 16zM27 16a1 1 0 0 0 1-1V13a1 1 0 0 0-2 0v2A1 1 0 0 0 27 16z"/></svg>
                    </a>
                    <span className="text-sm">Divyansh</span>  
                 </div>
            </div> 
        </footer>
       </>
   );
};

export default Footer;
