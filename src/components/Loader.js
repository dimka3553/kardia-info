import React from 'react'
import Svgloader from './Svgloader.svg';

export default function Loader() {
    return (
        <div className="loader">
            <object aria-label="Loading..." className="ab-c-m loader-svg" type="image/svg+xml" data={Svgloader}></object>
        </div>
    )
}
