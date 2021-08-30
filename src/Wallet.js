import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Wallet() {
    useEffect(() => {
        document.title = "Wallet - Kardia info"
    }, []);
    const [inp, setinp] = useState('');
    const changeInp = (e) => {
        setinp(e.target.value);
    }
    return (
        <div className="wallinpwrapper">
            <div className="wallinp">
                <h2 className="fs-20 p-b-0 m-t-0 fw-700">Wallet info v1</h2>
                <br />
                Input your wallet below to see the value of the tokens stored in it.
                <br />
                <br />
                <br />
                <div className="inputsdiv">
                    <input value={inp} onChange={changeInp} className="walletinp m-r-10 fs-16" placeholder="Input your wallet" />
                    <Link to={`/wallet/${inp}`}>
                        <button className="walletbtn fs-16 c-pointer">View info</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}
