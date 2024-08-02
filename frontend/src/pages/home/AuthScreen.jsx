import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";


const AuthScreen = () => {

    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

  return (
    <div className="hero-bg relative">
      {/*Navbar*/}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52" />
        <Link to={"/login"} className="bg-red-600 text-white py-1 px-2 rounded">Sign In</Link>
      </header>

      {/*Hero Section*/}
      <div className="flex flex-col items-center justify-center text-center py-20 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
        <p className="mb">Ready to watch? Enter your email to create or restart your membership</p>
        <form action="" className="flex flex-col md:flex-row gap-4 w-1/2">
            <input 
                type="email" 
                className="p-2 rounded flex-1 bg-black/80 border border-gray-700" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button className="bg-red-600 text-2xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
                Get Started
                <ChevronRight className="size-8 md:size-10" />
            </button>
        </form>
      </div>
    </div>
  )
}

export default AuthScreen
