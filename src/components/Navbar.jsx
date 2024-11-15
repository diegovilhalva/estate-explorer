import { useEffect, useState } from "react"
import {assets} from "../assets/assets"

const Navbar = () => {
  const [menu,setMenu] = useState(false)
  useEffect(() => {
    if(menu){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }
    return () => {
       document.body.style.overflow = 'auto'
    }
  },[menu])
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        <img src={assets.logo} alt="" />
        <ul className="hidden md:flex gap-7 text-white">
          <a href="#Header"  className="cursor-pointer hover:text-gray-400">Home</a>
          <a href="#About" className="cursor-pointer hover:text-gray-400">About</a>
          <a href="#Projects" className="cursor-pointer hover:text-gray-400">Projects</a>
          <a href="#Testimonials" className="cursor-pointer hover:text-gray-400">Testimonials</a>
        </ul>
        <button className="hidden md:block bg-white px-8 py-2 rounded-full">Sign Up</button>
        <img src={assets.menu_icon} alt="" className="md:hidden w-7" onClick={() => setMenu(true)} />
      </div>
       <div className={`md:hidden ${menu ? 'fixed w-full' : 'h-0 w-0' }  right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}>
       <div className="flex justify-end p-6 cursor-pointer">
         <img src={assets.cross_icon} alt="" className="w-6" onClick={() => setMenu(false)} />
       </div>
       <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
         <a href="#Header" onClick={() => setMenu(false)} className="px-4 py-2 rounded-full inline-block">Home</a>
         <a href="#About" onClick={() => setMenu(false)} className="px-4 py-2 rounded-full inline-block">About</a>
         <a href="#Projects" onClick={() => setMenu(false)} className="px-4 py-2 rounded-full inline-block">Projects</a>
         <a href="#Testimonials" onClick={() => setMenu(false)} className="px-4 py-2 rounded-full inline-block">Testimonials</a>
       </ul>
     </div>
     
    </div>
  )
}

export default Navbar