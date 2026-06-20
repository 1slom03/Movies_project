import { Play, Star, Calendar, Clock, Heart, Trash2 } from 'lucide-react';
import { PATH } from '../../components';
import type { Root2 } from '../../@types';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { FilmImg } from '../../assets/images';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
    const navigate = useNavigate();
    const { likes, toggleLike } = useContext(Context);

    return (
        <div className="w-full h-screen bg-[#0a0a0c] text-white pt-5 px-4 pb-16">
            <div className="w-300 mx-auto mb-5">
                <span className="flex items-start gap-1 text-[14px] text-gray-400">
                    <p onClick={() => navigate(PATH.movies)} className="cursor-pointer duration-300 hover:text-amber-400">Kinolar</p>/
                    <span onClick={() => navigate(PATH.favorites)} className="text-amber-400">Sevimlilar</span>
                </span>
            </div>
            <div className="w-7xl mx-auto mb-12 flex gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </div>
                    <div>
                        <p className="text-[14px] font-semibold text-white">Sevimli kinolar</p>
                        <p className="text-[12px] text-gray-400">
                            {likes.length} ta kino saqlangan
                        </p>
                    </div>
                </div>

                {likes.length > 0 && (
                    <button onClick={() => likes.forEach((movie) => toggleLike(movie))} className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-colors duration-300 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 px-4 py-2 rounded-xl">
                        <Trash2 className="w-3.5 h-3.5" />
                        Barchasini o'chirish
                    </button>
                )}
            </div>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-amber-400 rounded-full" />
                    Sevimli Kinolar
                </h2>
                {likes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-5">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                            <Heart className="w-9 h-9 text-gray-600" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold text-gray-300 mb-1">
                                Hali sevimli kinolar yo'q
                            </p>
                            <p className="text-[14px] text-gray-500">
                                Kinolar sahifasidan tugmasini bosib saqlang
                            </p>
                        </div>
                        <button onClick={() => navigate(PATH.movies)} className="mt-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black text-sm font-semibold rounded-xl transition-colors duration-300">
                            Kinolarni ko'rish →
                        </button>
                    </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {likes.map((movie: Root2) => (
                            <div key={movie.show?.id} onClick={() => navigate(`${PATH.movies}/${encodeURIComponent(movie.show.name)}`)} className="cursor-pointer group relative bg-[#121214] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-400/5 flex flex-col justify-between">
                                <div className="relative w-full h-90 overflow-hidden">
                                    <img src={movie.show.image?.original || FilmImg} alt={movie.show.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#121214] via-transparent to-transparent opacity-80" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                        <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center text-black shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                            <Play className="w-6 h-6 fill-black ml-0.5" />
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(), toggleLike(movie); }} className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full hover:scale-110 transition-transform duration-300">
                                        <Heart className="w-4.5 h-4.5 text-red-500 fill-red-500 transition-colors duration-300" />
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
                )}
            </div>
        </div>
    );
}