import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { ProcuringEntityActions, ProcuringEntitySelectors, } from '../../../../redux/modules/ProcuringEntities';
import PropTypes from 'prop-types';
import { Col, Drawer} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Topbar from "../../../components/Topbar";
import CustomList from "../../../components/List";
import ListItem from "../../../components/ListItem";
import ListItemActions from "../../../components/ListItemActions";
import { getIdFromUrlPath, moneyFormat, showArchiveConfirm } from "../../../../Util";
import PackageForm from '../Form';

import "./styles.css";
import {useHistory} from "react-router-dom";
import BaseLayout from "../../../layouts/BaseLayout";
import DynamicBreadcrumbs from "../../../components/DynamicBreadcrumbs";


/* constants */
const nameSpan = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 19, xs: 19 };
const descriptionSpan = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const contractNoSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 4, xs: 2 };
const contractorSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const estimentedAmountNoSpan = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 4, xs: 2 };
const awardedAmountNoSpan = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 4, xs: 2 };
const completeDateSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };

const headerLayout = [
    { ...nameSpan, header: "Name" },
    { ...descriptionSpan, header: "Description" },
    { ...contractNoSpan, header: "Contract No" },
    { ...contractorSpan, header: "Contractor" },
    { ...estimentedAmountNoSpan, header: "Estimated Amount" },
    { ...awardedAmountNoSpan, header: "Awarded Amount" },
    { ...completeDateSpan, header: "Complete Date" },

];

const PackagesList = ({
    getPackes,
    packages,
    loading,
    showForm,
    deletePackage,
    createPackage,
    updatePackage,
    procuringEntity,
    openPackageForm,
    closePackageForm,
    selectPackage,
    selected,
    match,
    getProcuringEntity
}) => {


    const history = useHistory();
    const [isEditForm, setIsEditForm] = useState(false);
    const [visible, setVisible] = useState(false);
    const procuringEntityId = getIdFromUrlPath(match.path, 4);
    const filter = {'filter[procuring_entity_id]': procuringEntityId}


    const breadcrumbs =  packages.length > 0 ? [
        {
            title: 'Projects',
            url: '/projects',
            name: 'Projects'
        },
        {
            title: packages[0].procuring_entity.project.code,
            url: `/projects/${packages[0].procuring_entity.project.id}/`,
            name: packages[0].procuring_entity.project.name
        },
        {
            title: `Procuring Entities`,
            url: `/projects/${packages[0].procuring_entity.project.id}/procuring_entities`,
            name: `Procuring Entities under ${packages[0].procuring_entity.project.name}(${packages[0].procuring_entity.project.code})`
        },
        {
            title: `${packages[0].procuring_entity.agency.name}`,
            url: `/projects/${packages[0].procuring_entity.project.id}/procuring_entities/${packages[0].procuring_entity.id}`,
            name: `${packages[0].procuring_entity.agency.name}`
        },
        {
            title: `Packages`,
            url: match.url,
            name: `Packages procured in ${packages[0].procuring_entity.agency.name}`
        }
    ] : [];


    useEffect(() => {
        getPackes(filter)
        const id = getIdFromUrlPath(match.path, 4);
        getProcuringEntity(procuringEntityId);
    }, []);


    /**
     * @function
     * @name handleViewDetails
     * @description Handle handleViewDetails action
     *
     * @version 0.1.0
     * @since 0.1.0
     */
    const handleViewDetails = (item) => {
        const path = `${match.url}/${item.id}`;
        history.push(path);
    };


    /**
      * @function
      * @name handleOpenPackageForm
      * @description Open form
      *
      * @version 0.1.0
      * @since 0.1.0
      */
    const handleOpenPackageForm = () => {
        openPackageForm();
    };

    /**
     * @function
     * @name handleClosePackageForm
     * @description close form
     * @version 0.1.0
     * @since 0.1.0
     */
    const handleClosePackageForm = () => {
        setIsEditForm(false);
        setVisible(false);
        selectPackage(null);
        closePackageForm();
    };

    /**   
   * @function
   * @name handleRefresh
   * @description Handle refresh action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
    const handleRefresh = () => {
        getPackes(filter);
    };
    ;

    /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} item Action Catalogue to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
    const handleEdit = (item) => {
        selectPackage(item);
        setIsEditForm(true)
        openPackageForm();
    };


    const getAmount = (data) => {
        const { amount, currency } = data
        const { iso } = currency;
        const money = moneyFormat(amount);
        return `${money} ${iso} `;
    }

    return (
        <BaseLayout breadcrumbs={<DynamicBreadcrumbs breadcrumbs={breadcrumbs} />} >
            <div>
                {/* Topbar */}
                <Topbar
                    search={{
                        size: "large",
                        placeholder: "Search for Packages here ...",
                        onSearch: '',
                    }}
                    actions={[
                        {
                            label: "New Package",
                            icon: <PlusOutlined />,
                            size: "large",
                            title: "Add New Package",
                            onClick: handleOpenPackageForm,
                        },
                    ]}
                />
                {/* end Topbar */}

                {/* list starts */}
                <CustomList
                    itemName="Packages"
                    items={packages}
                    page={1}
                    itemCount={1}
                    loading={loading}
                    onRefresh={handleRefresh}
                    headerLayout={headerLayout}
                    renderListItem={({
                                         item,
                                     }) => (
                        <ListItem
                            key={item.id} // eslint-disable-line
                            name={item?.name}
                            item={item}
                            renderActions={() => (
                                <ListItemActions
                                    edit={{
                                        name: "Edit Package",
                                        title: "Update Package details",
                                        onClick: () => handleEdit(item),
                                    }}
                                    archive={{
                                        name: "Archive Package",
                                        title:
                                            "Remove Sub project from list of active Package",
                                        onClick: () => showArchiveConfirm(item, deletePackage),
                                    }}
                                    view={
                                        {
                                            name: "View Details",
                                            title: "View more detail of selected Package",
                                            onClick: () => handleViewDetails(item)
                                        }
                                    }

                                />
                            )}
                        >
                            {/* eslint-disable react/jsx-props-no-spreading */}

                            <Col {...nameSpan} >
                                {item?.name ? item?.name : 'N/A'}
                            </Col>
                            <Col {...descriptionSpan} className="contentEllipse">
                                {item?.description ? item?.description : 'N/A'}
                            </Col>
                            <Col {...contractNoSpan}  >
                                {item?.contract?.contract_no ? item?.contract?.contract_no : "N/A"}
                            </Col>
                            <Col {...contractorSpan} className="contentEllipse">
                                {item?.contract?.contractor ? item?.contract?.contractor?.name : 'N/A'}
                            </Col>
                            <Col {...estimentedAmountNoSpan} className="contentEllipse">
                                {item?.contract?.contract_cost ? getAmount(item?.contract?.contract_cost?.estimated_final_contract_price) : 'N/A'}
                            </Col>
                            <Col {...awardedAmountNoSpan} className="contentEllipse">
                                {item?.contract?.contract_cost ? getAmount(item?.contract?.contract_cost?.contract_award_value) : 'N/A'}
                            </Col>
                            <Col {...completeDateSpan} className="contentEllipse">
                                {item ? new Date(item?.contract?.contract_time?.intended_completion_date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                            </Col>

                            {/* eslint-enable react/jsx-props-no-spreading */}
                        </ListItem>
                    )}
                />
                {/* end list */}

                <Drawer
                    title={
                        isEditForm ? "Edit Package" : "Add New Package"
                    } width={550}
                    onClose={handleClosePackageForm}
                    footer={null}
                    visible={showForm}
                    bodyStyle={{ paddingBottom: 80 }}
                    destroyOnClose
                    maskClosable={false}
                    className="projectForm"
                >
                    <PackageForm
                        isEditForm={isEditForm}
                        selected={selected}
                        createPackage={createPackage}
                        loading={loading}
                        updatePackage={updatePackage}
                        procuringEntity={procuringEntity}
                    />

                </Drawer>

            </div>
        </BaseLayout>

    )
}


const mapStateToProps = (state) => {
    return {
        packages: ProcuringEntitySelectors.getPackagesSelector(state),
        loading: ProcuringEntitySelectors.loadingPackages(state),
        procuringEntity: ProcuringEntitySelectors.getProcuringEntitySelector(state),
        showForm: ProcuringEntitySelectors.showPackageFormSelector(state),
        selected: ProcuringEntitySelectors.selectedPackageSelector(state)
    }
}

const mapDispatchToProps = {
    getPackes: ProcuringEntityActions.getPackagesStart,
    deletePackage: ProcuringEntityActions.deletePackageStart,
    createPackage: ProcuringEntityActions.createPackageStart,
    updatePackage: ProcuringEntityActions.updatePackageStart,
    openPackageForm: ProcuringEntityActions.openPackageForm,
    closePackageForm: ProcuringEntityActions.closePackageForm,
    selectPackage: ProcuringEntityActions.selectPackage,
    getProcuringEntity: ProcuringEntityActions.getProcuringEntityStart

}

PackagesList.propTypes = {
    getPackage: PropTypes.func.isRequired,
    packages: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    openPackageForm: PropTypes.func.isRequired,
    closePackageForm: PropTypes.func.isRequired,
    selectPackage: PropTypes.func.isRequired,
    showForm: PropTypes.bool,
    getProcuringEntity: PropTypes.func,
};

PackagesList.defaultProps = {
    packages: null,
    loading: null,
    isEditForm: null,
    showForm: null,
    getPackage: () => {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesList);
