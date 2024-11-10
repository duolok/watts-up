import React from 'react';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Layout from '../../components/layout/Layout';
import MainContent from '../../components/layout/MainContent';
import Header from '../../components/Header';
import NewPropertyComponent from '../../components/user/NewProperty';

const RegisterPropertyPage = () => {
    return (
        <Layout userRole="User">
            <MainContent>
                <Header title="New Property" subtitle="Add a new property"/>
                <NewPropertyComponent/>
            </MainContent>
        </Layout>
    )
};

export default RegisterPropertyPage;
