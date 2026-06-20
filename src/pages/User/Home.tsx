// Lucide ikonkalari
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../components';
import { HeroImg } from '../../assets/images';

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="site-hero w-full h-screen  relative">
      <div className="w-300 mx-auto pt-12 text-white">
        <div className=" flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-[48px] font-black tracking-tight text-white leading-[130%] mb-5">Kino san'atini <br />
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-yellow-200 bg-clip-text text-transparent">CinemaMix</span> <br /> bilan his eting
            </h1>
            <p className="text-gray-400  leading-6 w-xl font-medium mb-5">
              Platformamizda jahon kinematografiyasining eng sara durdonalari, yuqori reytingli seriallar va eksklyuziv premyerlar joy olgan. Hech qanday cheklovlarsiz, eng mukammal tasvir va ovoz formatida tomosha qiling.
            </p>
            <div className=" pt-4">
              <button onClick={() => navigate(PATH.movies)} className="bg-amber-500 hover:bg-orange-200 text-black font-bold h-14 px-8 rounded-xl flex items-center gap-2.5  duration-200 active:scale-98 shadow-lg cursor-pointer shadow-amber-400/10">
                <Play className="w-6 h-6 fill-current" />
                <span className="text-[16px]">Tomosha qilish</span>
              </button>
            </div>
          </div>
          <div className="">
            <div className="border border-white/8 rounded-2xl p-4 backdrop-blur-md shadow-2xl">
              <div className="flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4 ">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">Premyera</span>
                  <span className="text-[12px] text-gray-500">Ultra HD 4K</span>
                </div>
                <div className="h-100 overflow-hidden mb-2">
                  <img src={HeroImg} alt="HeroImg" className='w-full h-full rounded-xl' />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <h4 className="text-sm font-semibold text-gray-400">Tez kunda platformada</h4>
                  <p className="text-xl font-bold text-white leading-tight">Yilning eng kutilgan ilmiy-fantastik kinosi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-10 absolute bottom-0  bg-black" />
    </main>
  )
}