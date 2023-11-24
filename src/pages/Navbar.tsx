import AukmarHorizontal from '../images/AumkarHorizontal.png'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Navbar = () => {
    const userType = useSelector((state:any) => state.userInformation.user_type);
    const Menus = [
        { title: 'Users', path:'/users', auth:"Manager"},
        { title: 'Branches', path: '/branches', auth:"Manager" },
        { title: 'Images', path: '/allimages', auth:"Manager" },
        { title: 'MyImages',path:'/images', gap: 'false', auth:"Harvester"},
    ]
    const MainLists = Menus.filter((items:any) => items.auth === userType);
  return (
    <div>
        <nav className="bg-white border-white h-20 dark:bg-white shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className='flex flex-row justify-between'>
                    <Link to="/home">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={AukmarHorizontal} className="h-12" alt="Aumkar Logo" />
                            <span className="self-center text-2xl text-gray-700 font-semibold whitespace-nowrap">Aumkar</span>
                        </div>
                    </Link>
                    <div className="items-center hidden w-full md:flex md:w-auto md:order-1 ml-24" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-white rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                            {
                                MainLists.map((menu, index) => (
                                    <Link to={menu.path} key={index}>
                                        <li>
                                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">{menu.title}</a>
                                        </li>
                                    </Link>
                                )) 
                            }
                        </ul>
                    </div>
            </div>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <Avatar size={36} icon={<UserOutlined />} />
                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            
            </div>
        </nav>
    </div>
  )
}

export default Navbar
