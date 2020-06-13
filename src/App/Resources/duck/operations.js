import * as actions from "./actions";
import * as API from "../../../API";


/**
 * get items operation
 */
export const getItems = () => (dispatch) => {
    dispatch(actions.getItemsStart());
    API.getItems()
        .then( res => dispatch(actions.getItemsSuccess(res)) )
        .catch( err => dispatch(actions.getItemsFailure(err)))
}

/**
 * get agencies operation
 */
export const getAgencies = () => (dispatch) => {
    dispatch(actions.getAgenciesStart());
    API.getAgencies()
        .then( res => dispatch(actions.getAgenciesSuccess(res)) )
        .catch( err => dispatch(actions.getAgenciesFailure(err)))
}