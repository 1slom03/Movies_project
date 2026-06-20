import { Play, Star, Calendar, Clock, Heart, ArrowLeft, Globe, Tv } from 'lucide-react';
import { PATH } from '../../components';
import type { Root2 } from '../../@types';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { FilmImg } from '../../assets/images';
import { useNavigate, useParams } from 'react-router-dom';
import { getApi } from '../../services/Api';

export default function MoviesMore() {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const { likes, toggleLike } = useContext(Context);

    const { data: movies, isLoading } = useQuery<Root2[]>({
        queryKey: ['movies'],
        queryFn: getApi,
    });

    const movie = movies?.find(
        (m) => m.show.name === decodeURIComponent(name || '')
    );

    const isLiked = likes.some((item) => item.show.id === movie?.show.id);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-[#0a0a0c] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="w-full min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center gap-4">
                <p className="text-gray-400 text-lg">Kino topilmadi</p>
                <button
                    onClick={() => navigate(PATH.movies)}
                    className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-xl hover:bg-amber-300 transition-colors"
                >
                    Orqaga qaytish
                </button>
            </div>
        );
    }

    const { show } = movie;

    return (
        <div className="w-full min-h-screen bg-[#0a0a0c] text-white pb-16">
            <div className="relative w-full h-120 overflow-hidden">
                <img src={show.image?.original || FilmImg} alt={show.name} className="w-full h-full object-cover object-top scale-105 blur-sm opacity-30" />
                <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0c]/40 via-[#0a0a0c]/60 to-[#0a0a0c]" />
                <button onClick={() => navigate(PATH.movies)} className="absolute top-6 left-6 flex items-center gap-2 text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                    <ArrowLeft className="w-4 h-4" />
                    Orqaga
                </button>
                <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8 flex gap-8 items-end">
                    <div className="w-48 h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                        <img src={show.image?.original || FilmImg} alt={show.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex pb-2">
                        <h1 className="text-[36px] font-bold mb-3 leading-tight">{show.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-5">
                            <span className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="text-amber-400 font-semibold">{show.rating?.average || '—'}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {show.premiered || '—'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {show.weight ? `${show.weight} min` : '—'}
                            </span>
                            {show.language && (
                                <span className="flex items-center gap-1.5">
                                    <Globe className="w-4 h-4" />
                                    {show.language}
                                </span>
                            )}
                            {show.status && (
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                    show.status === 'Running'? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                                    {show.status}
                                </span>
                            )}
                        </div>
                        {show.genres?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {show.genres.map((genre: string) => (
                                    <span key={genre} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl transition-colors duration-300 shadow-lg shadow-amber-400/20">
                                <Play className="w-4 h-4 fill-black" />
                                Tomosha qilish
                            </button>
                            <button onClick={() => toggleLike(movie)} className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${isLiked ? 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30' : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:text-white' }`} >
                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                {isLiked ? 'Saqlangan' : 'Saqlash'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-amber-400 rounded-full"/>Tavsif
                    </h2>
                    {show.summary ? (
                        <p className="text-gray-400 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: show.summary.replace(/<[^>]*>/g, ''),}}/>) : 
                        (<p className="text-gray-600 text-sm">Tavsif mavjud emas</p>)}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 h-fit">
                    <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                        <Tv className="w-4 h-4 text-amber-400" />
                        Qo'shimcha ma'lumot
                    </h3>
                    <ul className="space-y-3 text-sm">
                        {show.network?.name && (
                            <li className="flex justify-between">
                                <span className="text-gray-500">Kanal</span>
                                <span className="text-gray-200 font-medium">{show.network.name}</span>
                            </li>
                        )}
                        {show.type && (
                            <li className="flex justify-between">
                                <span className="text-gray-500">Turi</span>
                                <span className="text-gray-200 font-medium">{show.type}</span>
                            </li>
                        )}
                        {show.premiered && (
                            <li className="flex justify-between">
                                <span className="text-gray-500">Chiqgan yil</span>
                                <span className="text-gray-200 font-medium">{show.premiered.slice(0, 4)}</span>
                            </li>
                        )}
                        {show.ended && (
                            <li className="flex justify-between">
                                <span className="text-gray-500">Tugagan</span>
                                <span className="text-gray-200 font-medium">{show.ended}</span>
                            </li>
                        )}
                        {show.weight && (
                            <li className="flex justify-between">
                                <span className="text-gray-500">Davomiyligi</span>
                                <span className="text-gray-200 font-medium">{show.weight} min</span>
                            </li>
                        )}
                        {show.language && (
                            <li className="flex justify-between">
                                <span className="text-gray-500">Til</span>
                                <span className="text-gray-200 font-medium">{show.language}</span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}