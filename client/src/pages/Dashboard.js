import React from 'react';
import Layout from '../components/Layout/Layout';
import LatestJobs from '../components/LatestJobs'; // Make sure this path is correct
import '../styles/Dashboard.css';

const Dashboard = () => {
    return (
        <Layout>
            <div className="dashboard-container">
                <h1 className='dashboard-title'>Dashboard</h1>
                
                <section className="latest-jobs-section">
                    <h2 className='text'>Latest Job Postings</h2>
                    <LatestJobs />
                    
                </section>
            </div>
        </Layout>
    );
};

export default Dashboard;
