import { React, useEffect } from 'react'
import Homebig from './components/Homebig'
import Homesmall from './components/Homesmall'


export default function Home() {
    useEffect(() => {
        document.title = "Overview - Kardia info"
    }, []);
    return (
        <div>
            <Homesmall />
            <Homebig />
        </div>
    )
}
