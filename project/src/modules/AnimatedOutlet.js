import { Outlet, useOutlet } from "react-router-dom";
import { React, useState } from 'react'

export default function AnimatedOutlet () { 
    const o = useOutlet();
    const [outlet] = useState(o);

    return <>{outlet}</>;
};
