import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Home as HomeIcon,
  CreditCard,
  DollarSign,
  BarChart2,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/penghuni", label: "Penghuni", icon: Users },
    { path: "/rumah", label: "Rumah", icon: HomeIcon },
    { path: "/pembayaran", label: "Pembayaran", icon: CreditCard },
  ];

  const isActive = (path) => {
    if (path === "#") {
      return menuItems
        .find((item) => item.path === "#")
        ?.submenu.some((subItem) => location.pathname === subItem.path);
    }
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white shadow-lg border-r border-gray-700">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-100">RT Admin</h1>
      </div>
      <nav className="mt-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.path} className="mb-1">
            {item.submenu ? (
              <div>
                <div className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded-lg transition duration-200 ease-in-out">
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className={`ml-6 mt-2 space-y-1 transition-all duration-300 ease-in-out ${isActive(item.path) ? 'block' : 'hidden'}`}>
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`block py-2 px-4 rounded-lg ${
                        isActive(subItem.path)
                          ? "bg-gray-700 text-blue-300 font-medium"
                          : "text-gray-300 hover:text-blue-300 hover:bg-gray-700"
                      } transition duration-200 ease-in-out`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center py-2 px-4 rounded-lg ${
                  isActive(item.path)
                    ? "bg-gray-700 text-blue-300 font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-blue-300"
                } transition duration-200 ease-in-out`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
