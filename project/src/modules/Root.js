import React from 'react'
import Router from './Router'
import {useLocation} from "react-router-dom"
import AnimatedOutlet from "./AnimatedOutlet"
import {motion} from "framer-motion";

export default function Root() {
    const locations = useLocation()

    return(
            <>
                <Router/>
                <motion.div
                        key={locations.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full md:w-4/5"
                >
                    <AnimatedOutlet />
                </motion.div>
            </>
        )
}
