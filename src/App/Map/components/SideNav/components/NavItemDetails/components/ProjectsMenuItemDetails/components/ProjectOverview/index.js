import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProjectsTopSection from "../ProjectsTopSection";
import NationalProjectsOverview from "../NationalProjectsOverview";
import RegionalProjectsOverview from "../RegionalProjectsOverview";
import {mapActions, mapSelectors} from "../../../../../../../../../../redux/modules/map";
import {bindActionCreators} from "redux";
import {projectActions} from "../../../../../../../../../../redux/modules/projects";
import {mapProjectActions} from "../../../../../../../../../../redux/modules/map/projects";
import TopSection from "../../../TopSection";

/**
 * @function
 * @name ProjectsOverview
 * @description renders projects overview information
 */
function ProjectsOverview(
    {
        projectsStatistics,
        getProjectsOverview,
        projectsCountByRegion,
        getProjectsByRegion,
        showRegionalOverview,
        showNationalOverview,
        regionProjectStatistics,
        regionProjects,
        getProject,
        setShowNationalOverview,
        setShowRegionalOverview,
        clearRegionalProjects,
        region,
        loadingStatistics,
        showRegionalOverviewLoader
    }
) {
    return (
        <>
            <TopSection title="PROJECTS OVERVIEW"/>
            {showNationalOverview ? <NationalProjectsOverview
                getProjectsOverview={getProjectsOverview}
                projectsStatistics={projectsStatistics}
                projectsCountByRegion={projectsCountByRegion}
                getProjectsByRegion={getProjectsByRegion}
                loadingStatistics={loadingStatistics}
            /> : ''}
            {showRegionalOverview ? <RegionalProjectsOverview
                regionProjectStatistics={regionProjectStatistics}
                showRegionalOverviewLoader={showRegionalOverviewLoader}
                regionProjects={regionProjects}
                getProject={getProject}
                region={region}
                setShowNationalOverview={setShowNationalOverview}
                setShowRegionalOverview={setShowRegionalOverview}
                clearRegionalProjects={clearRegionalProjects}
            /> : ''}

        </>
    );
}

const mapStateToProps = state => ({
    projectsStatistics: mapSelectors.getProjectsStatistics(state),
    regionProjectStatistics: mapSelectors.getRegionProjectsStatistics(state),
    loadingStatistics : mapSelectors.getProjectsStatisticsLoading(state),
    projectsCountByRegion: mapSelectors.getProjectsOverview(state),
    showNationalOverview: mapSelectors.showNationalOverviewSelector(state),
    showRegionalOverview: mapSelectors.showRegionalOverviewSelector(state),
    showRegionalOverviewLoader: mapSelectors.regionProjectsStatisticsLoader(state),
    regionProjects: mapSelectors.getRegionProjectsSelector(state),
    region: mapSelectors.getRegionDetailsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    getProjectsOverview: bindActionCreators(mapActions.getProjectsOverviewStart, dispatch),
    getProjectsByRegion: bindActionCreators(mapActions.getProjectsByRegionStart, dispatch),
    setShowRegionalOverview: bindActionCreators(mapActions.showRegionalProjectsOverview, dispatch),
    setShowNationalOverview: bindActionCreators(mapActions.showNationalProjectsOverview, dispatch),
    clearRegionalProjects: bindActionCreators(mapActions.clearRegionProjects, dispatch),
    getProject: bindActionCreators(mapProjectActions.getProjectStart, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsOverview);

ProjectsOverview.propTypes = {
    projectsStatistics: PropTypes.object,
    showRegionalOverview: PropTypes.bool.isRequired,
    showNationalOverview: PropTypes.bool.isRequired,
    projectsCountByRegion: PropTypes.array.isRequired,
    getProjectsOverview: PropTypes.func.isRequired,
    getProjectsByRegion: PropTypes.func.isRequired,
    setShowNationalOverview: PropTypes.func.isRequired,
    setShowRegionalOverview: PropTypes.func.isRequired,
    clearRegionalProjects: PropTypes.func.isRequired,
    getProject: PropTypes.func.isRequired,
    regionProjects: PropTypes.array.isRequired,
}

ProjectsOverview.defaultProps = {
    projectsStatistics: null,
}
