import React from 'react';
import PropTypes from 'prop-types';
import ProjectsMenuItemDetails from './components/ProjectsMenuItemDetails';
import SubProjectsMenuItemDetails from './components/SubProjectsMenuItemDetails';
import DataSetsMenuItemDetails from "./components/DataSetsMenuItemDetails";
import './styles.css'


function NavItemDetails({ activeItem }) {
    return (
        <div
            className='NavItemDetails'
        >
            {activeItem === 'projects' ? <ProjectsMenuItemDetails /> : ''}
        </div>
    );
}

NavItemDetails.propTypes = {
    activeItem: PropTypes.string.isRequired
}


export default NavItemDetails;
