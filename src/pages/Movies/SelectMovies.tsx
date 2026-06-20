import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FilmImg } from '../../assets/images';
import type { Root2 } from '../../@types';
import { PATH } from '../../components';
import { Calendar, Clock, Heart, Play, Search, Star } from 'lucide-react'; // YANGI: Heart qo'shildi
import { useContext, useState, useMemo, type ChangeEvent } from 'react'; // useMemo qo'shildi
import { Context } from '../../context/Context';

export default function SelectMovies() {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate()

    const { data: movies, isLoading } = useQuery({
        queryKey: ['selectedMovieSearch', name],
        queryFn: async () => {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${name}`);
            return response.data;
        },
        enabled: !!name
    });

    const { year, likes, toggleLike } = useContext(Context) // YANGI: likes va toggleLike ham olindi

    // TUZATILDI: movies2 o'rniga search va filter uchun alohida state'lar
    const [searchValue, setSearchValue] = useState<string>('')
    const [selectedYear, setSelectedYear] = useState<string>('')

    // TUZATILDI: movies o'zgarsa ham, search va filter ishlaydi (useMemo bilan)
    const filteredMovies = useMemo(() => {
        if (!movies) return []

        return movies.filter((item: Root2) => {
            // Search filter - nom bo'yicha qidirish
            const matchesSearch = item.show.name
                .toLowerCase()
                .includes(searchValue.toLowerCase())

            // Yil filter - premiered sanasidan yil olinadi
            // TUZATILDI: String(selectedYear) — numberni stringga o'giradi
            const matchesYear = selectedYear === '' || selectedYear === 'Hammasi'
                ? true
                : item.show.premiered?.startsWith(String(selectedYear))

            // TUZATILDI: ikkalasi ham mos kelsa ko'rsatiladi
            return matchesSearch && matchesYear
        })
    }, [movies, searchValue, selectedYear]) // movies, search yoki yil o'zgarganda qayta hisoblaydi

    // TUZATILDI: to'g'ridan-to'g'ri state'ni yangilaydi
    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value)
    }

    // TUZATILDI: yil tanlanganda filter ishlaydi
    function handleYearFilter(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedYear(e.target.value)
    }

    if (isLoading) return <div className="text-white text-center pt-24 text-lg">Kino ma'lumotlari qidirilmoqda...</div>;

    return (
        <div className="w-full min-h-screen bg-[#0a0a0c] text-white pt-5 px-4 pb-16">
            <div className="w-300 mx-auto mb-5">
                <span className='flex items-start'>
                    <p onClick={() => navigate(PATH.movies)} className='cursor-pointer text-[14px] duration-300 hover:text-amber-400'>Kinolar</p>/
                    <span></span>
                </span>
            </div>
            <div className="max-w-7xl mx-auto mb-12 flex gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="relative w-full md:w-96">
                    {/* TUZATILDI: value va onChange to'g'ri ulandi */}
                    <input
                        value={searchValue}
                        onChange={handleSearch}
                        type="text"
                        placeholder="Kinolarni qidirish..."
                        className="w-full bg-[#121214] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-400 transition"
                    />
                    <Search className="absolute left-4 top-3.5 text-gray-500 w-4 h-4" />
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* TUZATILDI: onChange qo'shildi, yil filter endi ishlaydi */}
                    <select
                        value={selectedYear}
                        onChange={handleYearFilter}
                        className="bg-[#121214] border border-white/10 rounded-xl py-2.5 px-4 text-[14px] text-gray-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                        <option value="">Yil: Hammasi</option>
                        {year.map(item => (
                            // TUZATILDI: key va value qo'shildi
                            <option key={item.year} value={String(item.year)}>{item.year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-400 rounded-full" />Barcha Kinolar
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* TUZATILDI: movies2 o'rniga filteredMovies ishlatildi */}
                    {filteredMovies?.map((movie: Root2) => (
                        <div key={movie.show?.id} onClick={() => navigate(`${PATH.movies}/${encodeURIComponent(movie.show.name)}`)} className="cursor-pointer group relative bg-[#121214] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-400/5 flex flex-col justify-between" >
                            <div className="relative w-full h-90 overflow-hidden">
                                <img src={movie.show.image?.original || FilmImg} alt={movie.show.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-linear-to-t from-[#121214] via-transparent to-transparent opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                    <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center text-black shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <Play className="w-6 h-6 fill-black ml-0.5" />
                                    </div>
                                </div>

                                {/* YANGI: Like tugmasi — card'ning yuqori o'ng burchagida joylashgan */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation() // MUHIM: bu bo'lmasa, like bosilganda card'ning o'zi ham bosilib, navigate ishga tushib ketadi
                                        toggleLike(movie)
                                    }}
                                    className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full hover:scale-110 transition-transform duration-300"
                                >
                                    <Heart
                                        className={`w-4.5 h-4.5 transition-colors duration-300 ${
                                            // YANGI: agar shu film likes ro'yxatida bo'lsa — qizil to'ldirilgan yurak, aks holda oq kontur
                                            likes.some((item) => item.show.id === movie.show.id)
                                                ? 'text-red-500 fill-red-500'
                                                : 'text-white'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold line-clamp-1 group-hover:text-amber-400 transition-colors">
                                        {movie.show.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {movie.show.premiered}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {movie.show.weight}min
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                                        <Star className="w-4 h-4 fill-amber-400" />
                                        {movie.show.rating.average || 4.6}
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium group-hover:text-gray-300 transition-colors">
                                        Tomosha qilish →
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}