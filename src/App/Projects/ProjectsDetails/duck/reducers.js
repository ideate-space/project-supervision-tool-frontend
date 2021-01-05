import { combineReducers } from "redux";
import * as types from "./types";

const borrowers = (state = [], action) => {
    switch (action.type) {
      case types.GET_BORROWERS_START:
        return state
      case types.GET_BORROWERS_SUCCESS:
        return action.payload 
      case types.GET_BORROWERS_FAILURE:
        return  action.payload
      default:
        return state;
  
    }
  }

  const funding_orgs = (state = [], action) => {
    switch (action.type) {
      case types.GET_FUNDING_ORG_START:
        return state
      case types.GET_FUNDING_ORG_SUCCESS:
        return action.payload 
      case types.GET_FUNDING_ORG_FAILURE:
        return  action.payload
      default:
        return state;
  
    }
  }

  export const projectDetails = combineReducers ({
    borrowers,
    funding_orgs
  });
