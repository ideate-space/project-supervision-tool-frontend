import React from "react";
import PropTypes from 'prop-types';
import BackLink from "../BackLink";
import OverviewTable from "../OverviewTable";
import { Spin, Checkbox } from 'antd';
import './styles.css';

/**
 * @function
 * @name SideNavItemOverview
 * @description renders project overview at national level
 */
const status = [
    'Active', 'Closed', 'Droped'
]

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

function SideNavItemOverview({
    overViewData,
    title,
    goBack,
    loadingStatistics,
    showRegionalOverviewLoader,
}) {

    return (
        <div className='SideNavItemOverview'>
            {/* 
            <section className='title-and-back-button'>
                <div>{title}</div>
                {goBack ? <BackLink goBack={goBack} /> : ''}
            </section> */}

            { showRegionalOverviewLoader ? <section className='project-over-view-table'>
                {showRegionalOverviewLoader === true ? <Spin spinning={showRegionalOverviewLoader} style={{ paddingLeft: 125 }} /> : <OverviewTable data={overViewData} />}
            </section> : <section className='project-over-view-table'>
                    {loadingStatistics === true ? <Spin spinning={loadingStatistics} style={{ paddingLeft: 125 }} /> : <OverviewTable data={overViewData} />}
                </section>}

            <section className='project-regions-filters'>
                <div className="status">
                    {status.map(data => <Checkbox onChange={onChange}>{data}</Checkbox>)}
                </div>
                <hr />
            </section>
        </div>
    );

}

export default SideNavItemOverview;

SideNavItemOverview.propTypes = {
    overViewData: PropTypes.array.isRequired,
    predefinedFilterConfig: PropTypes.object.isRequired,
    predefinedFilterData: PropTypes.array.isRequired,
    title: PropTypes.string,
    goBack: PropTypes.func,
    handleOnclickFilterItem: PropTypes.func,
    loadingStatistics: PropTypes.bool,
}

SideNavItemOverview.defaultProps = {
    goBack: null,
    title: '',
    handleOnclickFilterItem: () => { },
}
