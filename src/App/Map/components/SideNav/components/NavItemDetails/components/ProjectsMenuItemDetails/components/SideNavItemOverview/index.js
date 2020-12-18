import React from "react";
import PropTypes from 'prop-types';
import PredefinedFilter from "../PredefinedFilter";
import './styles.css';
import BackLink from "../BackLink";
import OverviewTable from "../OverviewTable";





/**
 * @function
 * @name SideNavItemOverview
 * @description renders project overview at national level
 */
function SideNavItemOverview({
                                 overViewData,
                                 predefinedFilterData,
                                 predefinedFilterConfig,
                                 title,
                                 goBack,
                                 handleOnclickFilterItem,
}) {


    return (
        <div className='SideNavItemOverview'>

            <section className='title-and-back-button'>
                <div>{ title }</div>
                {goBack ? <BackLink goBack={goBack} /> : ''}
            </section>

            <section className='project-over-view-table'>
                <OverviewTable data={overViewData}/>
            </section>

            <section className='project-regions-filters'>
                <PredefinedFilter
                    data={predefinedFilterData}
                    config={predefinedFilterConfig}
                    handleOnclickFilterItem={handleOnclickFilterItem}
                    filterTitle={predefinedFilterConfig.filterTitle}
                />
            </section>
        </div>
    );

}

export default SideNavItemOverview;

SideNavItemOverview.propTypes = {
    overViewData: PropTypes.object.isRequired,
    predefinedFilterConfig: PropTypes.object.isRequired,
    predefinedFilterData: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    goBack: PropTypes.func,
    handleOnclickFilterItem: PropTypes.func,

}

SideNavItemOverview.defaultProps = {
    goBack: null,
    handleOnclickFilterItem: () => {},
}
