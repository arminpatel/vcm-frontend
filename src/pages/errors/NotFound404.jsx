import React from "react"
import { Navbar } from "../../components/Navbar"
import { ReactComponent as ErrorSvg } from "../../../assets/errorpageillustration.svg"
import Footer from "../../components/Footer"
import { useNavigate } from "react-router-dom"


const NotFound404 = () => {
    const navigate = useNavigate();

    return (
        <>
        <Navbar />
        <div className="mt-20 w-screen h-screen flex flex-col items-center"> 
           <ErrorSvg className="w-2/5 h-2/5"/> 
           <h1 className="text-8xl"> 404 </h1> 
           <h2 className="text-2xl"> The page that you are looking for does not exist </h2> 
           <div className="mt-10">
            <button
              className="shadow-md py-3 px-6 text-white rounded-md bg-red-500 hover:bg-red-600"
              onClick={() => navigate("/")}
            >
                Go Back Home
            </button>
           </div> 
        </div> 
        <Footer />
        </>
     )
}

export default NotFound404
