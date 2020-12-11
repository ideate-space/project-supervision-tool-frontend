import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import SideNavItemOverview from "../../../SideNavItemOverview";
import {moneyFormat} from "../../../../../../../../../../Util";
import './styles.css';


/**
 * @function
 * @name RegionalProjectsOverview
 * @description renders project overview at regional level
 */
function RegionalProjectsOverview({regionProjectStatistics, regionProjects}) {

    // generate project commitment amount string
    const getCommitmentAmount = ({commitment_amount}) => {
        const {iso, total} = commitment_amount;
        const money = moneyFormat(total);
        return `${iso} ${money}`;
    }

    // data tobe displayed  on the overview filter
    const overViewData = regionProjectStatistics ? [
        {title: 'Projects', value: regionProjectStatistics.projects},
        {title: 'Commitment Amount', value: getCommitmentAmount(regionProjectStatistics)},
        {title: 'Sub Projects', value: regionProjectStatistics.sub_projects},
    ] : [];


    // config data from the predefined filter
    const filterConfig = {filterTitle: 'Projects', filterRightTitle: 'Projects', filterLeftTitle: 'SubProjects'}

    // prepare data to display on predefined filter
    const filterData = regionProjects.length > 0 ? regionProjects.map(({name, sub_projects, id}) =>
        ({title: name, value: `${sub_projects.length}`, id})) : '';


    return (
        <SideNavItemOverview
            overViewData={overViewData}
            predefinedFilterConfig={filterConfig}
            predefinedFilterData={filterData}
            title='Regional Overview'
        />
    );

}

export default RegionalProjectsOverview;

RegionalProjectsOverview.propTypes = {
    regionProjectStatistics: PropTypes.object.isRequired,
    regionProjects: PropTypes.array.isRequired,
}
