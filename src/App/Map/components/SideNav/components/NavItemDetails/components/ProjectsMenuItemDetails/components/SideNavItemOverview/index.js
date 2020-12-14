import React from "react";
import PropTypes from 'prop-types';
import {LeftOutlined} from "@ant-design/icons";
import PredefinedFilter from "../PredefinedFilter";
import './styles.css';

/**
 * @function
 * @name ProjectOverviewTable
 * @description renders projects overview table
 */
function ProjectsOverviewTable({data}) {

    const renderData = (items) => items.map(({title, value}) => (
        <article>
            <div>{title}</div>
            <div className='value'>{value}</div>
        </article>
    ));
    return (
        <div className='ProjectOverviewTable'>
            {renderData(data)}
        </div>
    );
}



function BackButton({goBack}) {

    return (
        <div className="back-button" onClick={goBack}>
            <a>
                <LeftOutlined style={{fontSize: 10}}/>
                <span>Back</span>
            </a>
        </div>
    );
}

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
                {goBack ? <BackButton goBack={goBack} /> : ''}
            </section>

            <section className='project-over-view-table'>
                <ProjectsOverviewTable data={overViewData}/>
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