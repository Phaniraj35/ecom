import { createContext, useEffect, useState } from "react";
import shopData from '../shop-data';
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
    categoriesMap: []
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState([]);

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', shopData);
    // }, [])

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, [])

    const value = {categoriesMap, setCategoriesMap};
    return <CategoriesContext.Provider value={ value }>{ children }</CategoriesContext.Provider>
}