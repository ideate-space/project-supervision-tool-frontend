import {withLeaflet, Popup, Marker} from "react-leaflet";
import React, {Component} from "react";
import PropTypes from 'prop-types';
import Spiderfy from "./Spiderfy";
import {Link} from "react-router-dom";
import * as turf from '@turf/turf';
import Axios from "axios";

class ProjectPoints extends Component {

    static propTypes = {
        projects: PropTypes.array.isRequired,
    }

    handleSpiderfyClick = marker => {
        console.log(marker);
    };

    handleSpiderfy = markers => {
        console.log(markers);
    };

    handleUnspiderfy = markers => {
        console.log(markers);
    };

    render() {
        const { projects } = this.props;
        Axios.get(`https://kc.survey-project-supervision-tool.ga/o/authorize?client_id=${process.env.REACT_APP_KOBOTOOL_BOX_CLIENT_ID}&response_type=code&state=xyz`)
            .then(res => console.log('looking at form', res));
        return (
            <Spiderfy
                onClick={this.handleSpiderfyClick}
                onSpiderfy={this.handleSpiderfy}
                onUnspiderfy={this.handleUnspiderfy}
            >
                { projects.map( ({ regions }) => {
                     return regions.length > 0 ? regions.map((region) => {
                        const polygon = JSON.parse(region.geom);
                         const { geometry } = turf.pointOnFeature(polygon);
                         return (
                            <Marker
                                position={[geometry.coordinates[1], geometry.coordinates[0]]}
                                title={region.name}
                                key={region.id}
                            >
                                <Popup>
                                    <div><b>Region name:</b> { region.name}</div>
                                    <Link to="/app/map">View project</Link>
                                </Popup>
                            </Marker>
                        );
                    }) : '';

                })}
            </Spiderfy>);
    }
}


export default withLeaflet(ProjectPoints);
