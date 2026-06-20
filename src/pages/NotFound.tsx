import { ArrowRightIcon, Clapperboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-screen bg-[#0a0a0c] text-white flex items-center justify-center px-4">
      <div className="absolute w-150 h-150 mx-auto bg-amber-400/10 rounded-full blur-[120px]" />
      <div className="relative w-lg flex flex-col items-center text-center ">
        <div className="">
          <h1 className="font-bold text-[120px] leading-50">404</h1>
        </div>
        <div className="flex items-center gap-2 mt-2 mb-4 text-amber-400">
          <Clapperboard className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-[2px] uppercase">Sahna topilmadi</span>
        </div>
        <h2 className="text-[24px] font-bold mb-3">Bu kadr kinolar yo'q</h2>
        <p className="text-gray-400 text-[14px] mb-10 leading-relaxed">Qidirayotgan sahifa o'chirilgan, ko'chirilgan yoki umuman mavjud bo'lmagan bo'lishi mumkin.</p>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="px-6 py-3 bg-amber-400 cursor-pointer text-black text-[14px] font-bold rounded-xl hover:bg-amber-300 hover:scale-[1.02] duration-300 flex items-center gap-2" > Oraga qaytish <ArrowRightIcon/></button>
        </div>
      </div>
    </div>
  );
}