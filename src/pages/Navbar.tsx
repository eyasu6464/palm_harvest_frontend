import { Dropdown, Avatar, Menu } from 'antd';
import { LogoutOutlined, KeyOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from 'typescript-cookie';
import { is_user_logged } from '../redux/Actions';

import AukmarHorizontal from '../images/AumkarHorizontal.png';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userType = useSelector((state: any) => state.userInformation.user_type);

  const logout = () => {
    navigate('/');
    setCookie('userAccessKey', 'false', { expires: -1 });
    dispatch(is_user_logged(true));
    window.location.reload();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/profile">
          My Profile
        </Link>
      ),
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: (
        <Link to="/changepassword">
          Change Password
        </Link>
      ),
      icon: <KeyOutlined />,
    },
    {
      key: '3',
      label: (
        <div onClick={() => { logout(); }}>
          <p>Logout</p>
        </div>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const Menus = [
    { title: 'Users', path: '/users', auth: 'Manager' },
    { title: 'Branches', path: '/branches', auth: 'Manager' },
    { title: 'Images', path: '/allimages', auth: 'Manager' },
  ];

  // const MainLists = Menus.filter((items: any) => items.auth === userType);

  const dropdownItems = (
    <Menu>
      {items.map((item:any) => (
        <Menu.Item key={item.key}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <nav className="bg-white border-white h-20 dark:bg-white shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex flex-row justify-between">
            <Link to="/">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={AukmarHorizontal} className="h-12" alt="Aumkar Logo" />
                <span className="self-center hidden sm:block text-2xl text-gray-700 font-semibold whitespace-nowrap">Aumkar</span>
              </div>
            </Link>
            <div className="items-center hidden w-full md:flex md:w-auto md:order-1 ml-24" id="navbar-user">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-white rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                {Menus.map((menu, index) => (
                  <Link to={menu.path} key={index}>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                      >
                        {menu.title}
                      </a>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Dropdown overlay={dropdownItems} placement="bottom" arrow>
              <Avatar className="mx-8 mr-10 md:mr-2" style={{ backgroundColor: '#ff6929', color: 'black' }}>U</Avatar>
            </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
