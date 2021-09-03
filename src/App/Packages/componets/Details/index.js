import React, { useEffect } from 'react';
import { Col, Layout, Row, Spin } from "antd";
import { ProcuringEntityActions, ProcuringEntitySelectors } from '../../../../redux/modules/ProcuringEntities';
import { connect } from "react-redux";
import { getAmount, getIdFromUrlPath, isoDateToHumanReadableDate } from '../../../../Util'
import './styles.css';
import PackageHomeNavMenu from "../../../navigation/PackagesHome";
import BaseLayout from "../../../layouts/BaseLayout";
import DynamicBreadcrumbs from "../../../components/DynamicBreadcrumbs";
const { Content } = Layout;

const totalCostSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const columnSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const commitmentSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const projectSpan = { xxl: 5, xl: 5, lg: 5, md: 5, sm: 11, xs: 11 };
const statusSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const projectCoordinatorSpan = { xxl: 6, xl: 6, lg: 6, md: 0, sm: 12, xs: 12 };
const implementingAgencySpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const projectsLocationSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 12, xs: 12 };
const lastUpdateSpan = { xxl: 6, xl: 6, lg: 6, md: 0, sm: 12, xs: 12 };


const PackageDetails = ({ match, procuringEntityPackage, getProcuringEntityPackage }) => {

    useEffect(() => {
        const id = getIdFromUrlPath(match.url, 6)
        getProcuringEntityPackage(id);
    }, []);


    const breadcrumbs = procuringEntityPackage ? [
        {
            title: 'Projects',
            url: '/projects',
            name: 'Projects'
        },
        {
            title: procuringEntityPackage.procuring_entity.project.code,
            url: `/projects/${procuringEntityPackage.procuring_entity.project.id}/`,
            name: procuringEntityPackage.procuring_entity.project.name
        },
        {
            title: `Procuring Entities`,
            url: `/projects/${procuringEntityPackage.procuring_entity.project.id}/procuring_entities`,
            name: `Procuring Entities under ${procuringEntityPackage.procuring_entity.project.name}(${procuringEntityPackage.procuring_entity.project.code})`
        },
        {
            title: `${procuringEntityPackage.procuring_entity.agency.name}`,
            url: `/projects/${procuringEntityPackage.procuring_entity.project.id}/procuring_entities/${procuringEntityPackage.procuring_entity.id}`,
            name: `${procuringEntityPackage.procuring_entity.agency.name}`
        },
        {
            title: `Packages`,
            url: `/projects/${procuringEntityPackage.procuring_entity.project.id}/procuring_entities/${procuringEntityPackage.procuring_entity.id}/packages`,
            name: `Packages procured in ${procuringEntityPackage.procuring_entity.agency.name}`
        },
        {
            title: `${procuringEntityPackage?.name}`,
            url: match.url,
            name: `${procuringEntityPackage?.contract?.name}`
        }
    ] : [];

    return procuringEntityPackage ? (
        <BaseLayout breadcrumbs={<DynamicBreadcrumbs breadcrumbs={breadcrumbs} />} >
            <Layout className="project-layout">
                <Spin spinning={false} tip="Loading..." >
                    <Content className="contents">
                        <h3>{procuringEntityPackage.name || 'N/A'}</h3>
                        <Layout className="project-inner-layout" >
                            <Content className="project-contents">
                                <div className="card-container">
                                    <div className="keyDetails grey-bgr">
                                        <h2 id="sider-title">Key Details</h2>
                                        <section className="container">
                                            <Row className="key-details">
                                                <Col {...columnSpan} className="contractName">
                                                    <h4>Project Name</h4>
                                                    <p>{procuringEntityPackage?.contract.name || 'N/A'}</p>
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Procuring Entity</h4>
                                                    <p>{procuringEntityPackage?.procuring_entity?.agency?.name || 'N/A'}</p>
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Project Component</h4>
                                                    <p>{procuringEntityPackage?.project_component?.name || 'N/A'}</p>
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Project SubComponent</h4>
                                                    <p>{procuringEntityPackage?.project_sub_component?.name || 'N/A'}</p>
                                                </Col>
                                               
                                                <Col {...columnSpan} >
                                                    <h4>Contract No</h4>
                                                    <p>{procuringEntityPackage?.contract?.contract_no || 'N/A'}</p>
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Contractor</h4>
                                                    <p>{procuringEntityPackage?.contract?.contractor?.name || 'N/A'}</p>

                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Original Contract Sum</h4>
                                                    {getAmount(procuringEntityPackage?.contract?.original_contract_sum) || 'N/A'}

                                                </Col>
                                                <Col {...columnSpan} >
                                                    <h4>Reversed Contract Sum</h4>
                                                    {procuringEntityPackage?.contract?.revised_contract_sum ? getAmount(procuringEntityPackage?.contract?.revised_contract_sum) : 'N/A'}
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Contract Agreement Date </h4>
                                                    {new Date(procuringEntityPackage?.contract?.date_contract_agreement_signed).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) || 'N/A'}
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Date Possession of Site Given</h4>
                                                    {new Date(procuringEntityPackage?.contract?.date_possession_of_site_given).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) || 'N/A'}
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Date Of Commencement</h4>
                                                    {new Date(procuringEntityPackage?.contract?.date_of_commencement_of_works).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) || 'N/A'}
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>End Date Of Mobilization</h4>
                                                    {new Date(procuringEntityPackage?.contract?.date_of_end_of_mobilization_period).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) || 'N/A'}
                                                </Col>

                                                <Col {...columnSpan}>
                                                    <h4>Completion Date</h4>
                                                    {new Date(procuringEntityPackage?.contract?.date_of_contract_completion).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) || 'N/A'}
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Revised Date Of Contract Completion</h4>
                                                    {new Date(procuringEntityPackage?.contract?.revised_date_of_contract_completion).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) || 'N/A'}
                                                </Col>
                                                <Col {...columnSpan}>
                                                    <h4>Defects Liability Notification Period</h4>
                                                    {procuringEntityPackage?.contract?.defects_liability_notification_period || 'N/A'}
                                                </Col>
                                                <Col {...columnSpan} >
                                                    <h4>Original Contract Period</h4>
                                                    <p>{procuringEntityPackage?.contract?.original_contract_period || 'N/A'}</p>
                                                </Col>
                                                <Col {...columnSpan} >
                                                    <h4>Reversed Contract Period</h4>
                                                    <p>{procuringEntityPackage?.contract?.revised_contract_period|| 'N/A'}</p>
                                                </Col>
                                                

                                            </Row>
                                        </section>
                                    </div>
                                    <PackageHomeNavMenu match={match} />
                                </div>
                            </Content>
                        </Layout>
                    </Content>
                </Spin>
            </Layout>
        </BaseLayout>
    ) : '';
}

const mapStateToProps = state => ({
    procuringEntityPackage: ProcuringEntitySelectors.getPackageSelector(state)
});

const mapDispatchToProps = {
    getProcuringEntityPackage: ProcuringEntityActions.getPackageStart
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetails);
