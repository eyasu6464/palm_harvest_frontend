import React, { useState } from 'react'

const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const Menus = [
        { title: 'Users', path:'/users', src:"", auth:""},
        { title: 'Images', path: '/images', src: "", auth:"" },
        { title: 'Branches', path: '/branches', src: "", auth:"" },
        { title: 'Profile', path: '/profile', src: "", auth:"" },
        { title: 'Home', path:'/home', src:"",gap: 'false', auth:""},
    ]
  return (
    <div>
        <div
                className={`${
                    open ? 'w-60' : 'w-fit'
                } hidden sm:block relative h-full duration-300 bg-gray-100 p-5 dark:bg-white`}
            >
                    <div className={`flex ${'gap-x-4'} items-center`}>
                        {true && (
                            <span className='text-xl font-medium whitespace-nowrap dark:text-zinc-700'>
                            </span>
                        )}
                    </div>

                <ul className='pt-6'>
                    {Menus.map((menu, index) => (
                            <li
                                className={`flex items-center gap-x-2 p-1 text-base font-normal rounded-lg cursor-pointer dark:text-zinc-700 hover:bg-gray-200 dark:hover:bg-white dark:hover:shadow-lg
                        ${menu.gap ? 'mt-4' : 'mt-2'} ${
                                    location.pathname === menu.path &&
                                    'bg-gray-50 dark:shadow-lg '
                                }`}
                            >
                                <span className='text-2xl'>{menu.src}</span>
                                <span
                                    className={`${
                                        !open && 'hidden'
                                    } origin-left duration-300 hover:block`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                    ))}
                </ul>
            </div>
      
    </div>
  )
}

export default Sidebar
