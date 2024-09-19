
import Logo from '../assets/logo.png'

import { useNavigate } from 'react-router-dom'
import Bg from '../assets/bg.png'

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='w-full h-screen relative'>
                {/* Image */}
                <img className='w-full h-screen object-cover relative' src={Bg} alt="" />

                {/* Overlay div with .5 transparency */}
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>

                {/* Content inside the overlay */}
                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start pl-[10%]'>
                    <h1 className="text-3xl md:text-3xl sm:text-xl lg:text-7xl font-bold text-[#CD5C08] mb-4 leading-6 heading">WELCOME TO  <br />OUR WEBSITE</h1>
                    <p className="md:w-1/2 text-xl md:text-xl sm:text-xl lg:text-2xl font-sm text-gray-400 leading-relaxed text-start">
                        We provide innovative solutions for your business needs. Our team of experts is dedicated to delivering high-quality results that exceed your expectations.
                    </p>
                    <div className="absolute w-80 h-100 bg-contain bg-no-repeat bg-center right-[10%]">
                        <img src={Logo} alt="" />
                    </div>
                    <button onClick={()=>navigate('/login')} className="absolute bottom-[18%] bg-white text-black font-bold py-2 px-6 rounded-full shadow hover:bg-gray-300 transition-all hover:scale-105 duration-300 self-start">
                        Get Started
                    </button>
                </div>
            </div>


        </div >
    )
}

export default Landing


