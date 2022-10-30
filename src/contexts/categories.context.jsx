import { createContext, useEffect, useReducer } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'
import { createAction } from "../utils/reducer/reducer.utils"

const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES_MAP: 'SET_CATEGORIES_MAP',
};

const INITIAL_STATE = {
  categoriesMap : {},
}

const categoriesReducer = (state, action) => {
  const { type, payload } = action

  switch(type){
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP : 
    return {
        ...state,
        categoriesMap : payload
    }
    default:
        throw new Error(`Unhandled type of ${type} in categoriesReducer`)
  }
}

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer, 
    INITIAL_STATE
  )

  const setCategoriesMap = (categories) => {
    dispatch(createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categories))
  }

  useEffect(() => {
    const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments()
        setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  },[])

  const value = { 
    categoriesMap 
  }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};