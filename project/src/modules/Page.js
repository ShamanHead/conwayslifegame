import React from 'react'

export default class Page extends React.Component {
    constructor(props) {
        super(props);      
    }

    render() {
        return (
            <>
                <div className="page">
                    <h2 className="page-title">Main title</h2>
                    <span className="page-article">You can see article here</span>
                </div>
            </>
        ) 
    }
}
