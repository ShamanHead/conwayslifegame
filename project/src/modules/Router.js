import React from 'react'
import { fallDown as Menu } from 'react-burger-menu';
import { Outlet, Link, NavLink } from "react-router-dom";
import CanvasMenu from './CanvasMenu'

export default class Router extends React.Component {
    constructor(props) {
        super(props)

        this.state = 
            {
                menus: 
                    [
                        {
                            name: 'Home',
                            path: '/',
                            icon: [<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>],
                            element: <CanvasMenu/>
                        },
                        {
                            name: 'Patterns',
                            path: '/patterns',
                            icon: [<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>]
                        },
                        {
                            name: 'Learn',
                            path: '/learn',
                            icon: [<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>]
                        },
                        {
                            name: 'About',
                            path: '/about',
                            icon: [<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>]
                        }
                    ]
            }
    }

    getMenu() {
        return [
            <div className="w-full mt-3 hidden flex-col md:flex">
            {
                this.state.menus.map((el) => {
                    return [<NavLink to={el.path} className="router-item flex flex-row items-center">{el.icon}{el.name}</NavLink>]        
                })
            }
            </div>
            ];
            
    }

    render() {
        return (
            <div className="router flex flex-col items-center w-full md:w-1/5 md:min-h-screen">
                <div className="router-header">
                    <Menu width={"100%"}>
                        {this.getMenu()}
                    </Menu>
                    <h1 className="router-name">The Game of Life</h1> 
                </div>
                {this.getMenu()}
                <div className="hidden md:flex text-lg mb-5 flex-col mt-auto text-center">
                    <span>Arseniy Romanovskiy, (c) 2021, MIT</span>
                    <span>Made with ❤️</span>
                </div>
            </div>
        )
    }
}
