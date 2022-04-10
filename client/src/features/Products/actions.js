import { 
    SUCCESS_FETCHING_PRODUCT, 
    START_FETCHING_PRODUCT, 
    ERROR_FETCHING_PRODUCT, 
    SET_PAGE, 
    SET_KEYWORD, 
    SET_CATEGORY,
    SET_TAGS,
    TOGGLE_TAG,
    PREV_PAGE,
    NEXT_PAGE
  } from './constants';
  
export const startFetchingProducts = () => {
    return {
      type: START_FETCHING_PRODUCT
    }
  }
  
  export const errorFetchingProducts = () => {
    return {
      type: ERROR_FETCHING_PRODUCT
    }
  }