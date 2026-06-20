import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"; 
import type { FilterType, Root2 } from "../@types"; // YANGI: Root2 ham import qilindi (like uchun film tipi)

interface ContextType {
    year: FilterType[];
    setYear: Dispatch<SetStateAction<FilterType[]>>;
    likes: Root2[]; // YANGI: like qilingan filmlar ro'yxati
    setLikes: Dispatch<SetStateAction<Root2[]>>; // YANGI: like'larni o'zgartirish funksiyasi
    toggleLike: (movie: Root2) => void; // YANGI: like bosish/olib tashlash funksiyasi (bitta joyda yozib, hammasi shuni chaqiradi)
}

export const Context = createContext({} as ContextType)

export const GlobalContext = ({ children }: { children: ReactNode }) => {
    const [year, setYear] = useState<FilterType[]>([
        { id: 1, year: 2025 },
        { id: 1, year: 2024 },
        { id: 1, year: 2023 },
        { id: 1, year: 2022 },
        { id: 1, year: 2021 },
        { id: 1, year: 2020 },
        { id: 1, year: 2019 },
        { id: 1, year: 2018 },
        { id: 1, year: 2017 },
        { id: 1, year: 2016 },
        { id: 1, year: 2015 },
        { id: 1, year: 2014 },
        { id: 1, year: 2013 },
        { id: 1, year: 2012 },
        { id: 1, year: 2011 },
        { id: 1, year: 2010 },
        { id: 1, year: 2009 },
        { id: 1, year: 2008 },
        { id: 1, year: 2007 },
        { id: 1, year: 2006 },
        { id: 1, year: 2005 },
        { id: 1, year: 2004 },
        { id: 1, year: 2003 },
        { id: 1, year: 2002 },
        { id: 1, year: 2001 },
        { id: 1, year: 2000 },
        { id: 1, year: 1999 },
        { id: 1, year: 1998 },
        { id: 1, year: 1997 },
        { id: 1, year: 1996 },
        { id: 1, year: 1995 },
        { id: 1, year: 1994 },
        { id: 1, year: 1993 },
        { id: 1, year: 1992 },
        { id: 1, year: 1991 },
        { id: 1, year: 1990 },
        { id: 1, year: 1989 },
        { id: 1, year: 1988 },
        { id: 1, year: 1987 },
        { id: 1, year: 1986 },
        { id: 1, year: 1985 },
        { id: 1, year: 1984 },
        { id: 1, year: 1983 },
        { id: 1, year: 1982 },
        { id: 1, year: 1981 },
        { id: 1, year: 1980 },
    ])

    // YANGI: like qilingan filmlar uchun alohida state
    const [likes, setLikes] = useState<Root2[]>([])

    // YANGI: bitta film like bosilganmi yoki yo'qmi — qo'shadi yoki o'chiradi
    function toggleLike(movie: Root2) {
        setLikes((prev) => {
            // Avval shu film like ro'yxatida bor-yo'qligini tekshiramiz (id bo'yicha)
            const alreadyLiked = prev.some((item) => item.show.id === movie.show.id)

            if (alreadyLiked) {
                // Agar bor bo'lsa — ro'yxatdan olib tashlaymiz (like bekor qilish)
                return prev.filter((item) => item.show.id !== movie.show.id)
            } else {
                // Agar yo'q bo'lsa — ro'yxatga qo'shamiz (like qilish)
                return [...prev, movie]
            }
        })
    }

    // YANGI: likes, setLikes, toggleLike ham value ichiga qo'shildi
    return <Context.Provider value={{ year, setYear, likes, setLikes, toggleLike }}>{children}</Context.Provider>
}