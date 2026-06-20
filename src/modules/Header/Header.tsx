import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../components";
import { Film, Heart } from "lucide-react";
import { useContext } from "react";
import { Context } from "../../context/Context";



function Header() {
  const navigate = useNavigate();
  const { likes } = useContext(Context)

  return (
    <>
      <div className="bg-black p-4 border-b border-[#0f0f0f]">
        <header className="w-300 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 cursor-pointer">
              <Film className="w-8 h-8 text-amber-400" />
              <span className="text-[28px] font-bold text-white">Cinema<span className="text-amber-400">Mix</span>
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <NavLink to={PATH.home} className="hover:scale-[1.08] text-[14px] text-white font-bold duration-300">Bosh Sahifa</NavLink>
              <NavLink to={PATH.movies} className="hover:scale-[1.08] text-[14px] text-white font-bold duration-300">Kinolar</NavLink>
            </nav>
            <div onClick={() => navigate(PATH.favorites)} className="relative cursor-pointer">
              <Heart className="w-8 h-8 text-white hover:scale-[1.1] hover:text-amber-400 duration-300" />
              <span className="bg-red-500 p-1 text-white text-[8px] rounded-[50%] absolute top-0 left-5">{likes.length}</span>
            </div>
          </div>
        </header>
      </div>
    </>
  )

}


export default Header