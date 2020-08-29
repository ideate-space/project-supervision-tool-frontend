import moment from "moment";

/**
 * converts ISO date string to human readable
 * date and time
 *
 * @function
 * @name isoDateToHumanReadableDate
 *
 * @param {string} isoFormattDate
 *
 * @returns {string} human readable date
 * @version 0.1.0
 * @since 0.1.0
 */
export const isoDateToHumanReadableDate = (isoFormattDate) => {
    return moment(isoFormattDate)
        .utc()
        .format('MMMM Do YYYY');
}

/**
 * converts moment date  object to date string
 *
 * @function
 * @name generateDateString
 *
 * @param {Object} dateObject
 *
 * @returns {string} date string
 * @version 0.1.0
 * @since 0.1.0
 */
export const generateDateString = (dateObject) => {
    return moment(dateObject)
        .utc()
        .format('YYYY-MM-DD');
}

/**
 * create moment date  object from ISO string
 *
 * @function
 * @name createDateFromString
 *
 * @param {String} dateString
 *
 * @returns {Object} date
 * @version 0.1.0
 * @since 0.1.0
 */
export const createDateFromString = (dateString) => {
    return moment(dateString);
}

/**
 * get Geojson Object from an  location object
 *
 * @function
 * @name getGeoJsonFromLocation
 *
 * @param {Object} location
 *
 * @returns {Object}
 * @version 0.1.0
 * @since 0.1.0
 */
export const getGeoJsonFromLocation = ({ location }) => {
    switch (location.level) {
        case 'district':
            return location?.district?.geo_json;
        default:
            return location?.region?.geo_json;
    }
}
