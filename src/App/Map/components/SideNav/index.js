import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import Axios from "axios";
import convert from "xml-js";
import './styles.css';
import SideNavItem from "./components/SideNavItem";
import humanResourceImg from '../../../../assets/icons/human-resources-zero-opacity.svg'
import whiteHhumanResourceImg from '../../../../assets/icons/white-human-resources.svg'
import NavItemDetails from "./components/NavItemDetails";
import {mapActions, mapSelectors} from "../../duck";
import {bindActionCreators} from "redux";

class SideNav extends Component {

    static propTypes = {
        setActiveMapSideMenuItem: PropTypes.func,
        activeItem: PropTypes.string.isRequired,
    }

    static defaultProps = {
        setActiveMapSideMenuItem: () => {},
        regionProjects: [],
    }

    componentDidMount() {
        // const axiosGeoserver = Axios.create({
        //     headers: {
        //         Accept: "application/json",
        //     },
        // });
        // axiosGeoserver.get(`https://geonode.project-supervision-tool.ga/geoserver/rest/layers`)
        //     .then(({ data }) => {
        //         console.log(data);
        //     })

        // Axios.get(`https://geonode.project-supervision-tool.ga/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=geonode:dar_es_salaam_school_points&outputFormat=application/json`)
        //     .then(res => console.log(res.data));
    }

    render() {
        const {
            setActiveMapSideMenuItem,
            activeItem,
        } = this.props;
        return (
            <div className='SideNav'>
                <div className='nav-items-list'>
                    <SideNavItem
                        title="Projects"
                        activeThumbnail={humanResourceImg}
                        inactiveThumbnail={whiteHhumanResourceImg}
                        itemId='projects'
                        activeItem={activeItem}
                        setActiveItem={setActiveMapSideMenuItem}
                    />

                    <SideNavItem
                        title="Sub Projects"
                        activeThumbnail={humanResourceImg}
                        inactiveThumbnail={whiteHhumanResourceImg}
                        itemId='sub-projects'
                        activeItem={activeItem}
                        setActiveItem={setActiveMapSideMenuItem}
                    />

                    <SideNavItem
                        title="Data Sets"
                        activeThumbnail={humanResourceImg}
                        inactiveThumbnail={whiteHhumanResourceImg}
                        itemId='data-sets'
                        activeItem={activeItem}
                        setActiveItem={setActiveMapSideMenuItem}
                        getOverview={() => {
                        }}
                        clearOverview={() => {
                        }}
                    />

                </div>
                <NavItemDetails activeItem={activeItem}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    activeItem: mapSelectors.getActiveMapSideMenuItem(state)
});

const mapDispatchToProps = (dispatch) => ({
    setActiveMapSideMenuItem: bindActionCreators(mapActions.setActiveMapSideMenuItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);

