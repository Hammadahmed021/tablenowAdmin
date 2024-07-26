import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Check if the current path is '/dashboard'
  const isDashboard = location.pathname === '/dashboard';

  return (
    <nav className="mb-4">
      <ol className="p-0">
        <li className="flex items-center  ">
         <h6 className='text-2xl font-bold no-underline text-admin_dark mb-0'> Dashboard</h6>
        </li>
        {!isDashboard && (
          <li className="flex items-center">
            <FaHome className="" />
          
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;

              return (
                <React.Fragment key={to}>
                  <li className="px-2">/</li>
                  {isLast ? (
                    <li className="text-sm text-gray-600">
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </li>
                  ) : (
                    <li>
                      <Link to={to} className="text-admin_dark hover:underline text-sm">
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
