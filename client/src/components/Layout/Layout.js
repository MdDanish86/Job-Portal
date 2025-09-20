import React from 'react';
import '../../styles/Layout.css';
import { userMenu } from './Menus/UserMenu';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const sidebarMenu = userMenu;

    // logout handler
    const handleLogout = () => {
        localStorage.clear();
        toast.success('Logout Successfully!');
        navigate("/login");
    };

    return (
        <>
            <div className="row">
                <div className="col-md-3 sidebar">
                    {/* Sidebar Header with Logo and Title */}
                    <div className='logo d-flex align-items-center gap-2'>
                        {/* ✅ Only Logo is Clickable */}
                        <Link to="/">
                            <img
                                src="/assets/images/logo.png"
                                alt="logo"
                                className="sidebar-logo"
                            />
                        </Link>
                        <h6 className="mb-0 text-white">Job Portal</h6>
                    </div>

                    <hr />
                    <p className='text-center text-warning'>Welcome</p>
                    <hr />

                    <div className='menu'>
                        {sidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div className={`menu-item ${isActive && "active"}`} key={menu.name}>
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            );
                        })}

                        <div className="menu-item" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to='/login'>Logout</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">{children}</div>
            </div>
        </>
    );
};

export default Layout;
