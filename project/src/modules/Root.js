import React from 'react'
import Router from './Router'
import { Outlet } from "react-router-dom";

export default class Root extends React.Component {
    render() {
        return(
            <>
                <Router/>
                <Outlet/>
            </>
        )
    }
}
