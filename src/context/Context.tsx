import { createContext, useState, useEffect, type Dispatch, type ReactNode, type SetStateAction } from "react"; 
import type { FilterType, Root2 } from "../@types";

interface ContextType {
    year: FilterType[];
    setYear: Dispatch<SetStateAction<FilterType[]>>;
    likes: Root2[]; 
    setLikes: Dispatch<SetStateAction<Root2[]>>;
    toggleLike: (movie: Root2) => void;
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
    const [likes, setLikes] = useState<Root2[]>(() => {
        try {
            const saved = localStorage.getItem('liked_movies')
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })
    useEffect(() => {
        localStorage.setItem('liked_movies', JSON.stringify(likes))
    }, [likes])

    function toggleLike(movie: Root2) {
        setLikes((prev) => {
            const alreadyLiked = prev.some((item) => item.show.id === movie.show.id)

            if (alreadyLiked) {
                return prev.filter((item) => item.show.id !== movie.show.id)
            } else {
                return [...prev, movie]
            }
        })
    }

    return <Context.Provider value={{ year, setYear, likes, setLikes, toggleLike }}>{children}</Context.Provider>
}