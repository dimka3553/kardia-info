import React from 'react'
import { Link } from 'react-router-dom'

export default function Homebig() {
    return (
        <div className="hpwrapper">
            <div className="homepage pc p-b-0 p-t-50 p-r-20">
                <div className="hometopsec m-b-50">
                    <div className="l">
                        <div className="m-b-50 txt-l p-l-20 p-r-20">
                            <h1 className="lanhead m-b-50 fw-700">Get the latest KardiaChain stats in one place</h1>
                            <p className="t-g toptext fs-20">With <span className="t-bl">Kardia info</span> - you will have quick access to information regarding all things kardiachain.</p>
                        </div>
                        <img className="phoneimg m-b-50" alt="phone" src="./img/iphone.png"></img>
                    </div>
                    <div className="r">
                        <div className="kisvg">
                            <svg className="swirlysvg ab-r-m" width="335" height="394" viewBox="0 0 335 394" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M66.2183 116.756C73.8279 105.855 83.0768 96.1956 93.6374 88.1202L182.151 20.4366C192.622 12.4301 204.643 6.68789 217.451 3.57446C277.314 -10.9774 335 34.3662 335 95.9727V247.846C335 303.058 299.863 352.148 247.601 369.954L199.48 386.348C168.401 396.936 134.454 395.275 104.557 381.704L76.2389 368.849C2.78876 335.506 -22.3877 243.689 23.7833 177.547L66.2183 116.756Z" fill="url(#paint1430_linear)" />
                            </svg>
                            <svg className="ab-c-m" width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filterq0_d)">
                                    <rect x="15" y="15" width="200" height="200" rx="40" fill="white" />
                                    <path d="M145 107.65C145 103.425 148.425 100 152.65 100H167.35C171.575 100 175 103.425 175 107.65V167.35C175 171.575 171.575 175 167.35 175H152.65C148.425 175 145 171.575 145 167.35V107.65Z" fill="url(#paint0_linearaa)" />
                                    <path d="M145 70.0001C145 61.7158 151.716 55 160 55C168.284 55 175 61.7158 175 70.0001C175 78.2843 168.284 85.0001 160 85.0001C151.716 85.0001 145 78.2843 145 70.0001Z" fill="url(#paint1_linearab)" />
                                    <path d="M55 62.65C55 58.425 58.425 55 62.65 55H77.3501C81.575 55 85.0001 58.425 85.0001 62.65V167.35C85.0001 171.575 81.575 175 77.3501 175H62.65C58.425 175 55 171.575 55 167.35V62.65Z" fill="url(#paint2_linearac)" />
                                    <path d="M92.9541 141.898C91.5374 138.005 93.5444 133.702 97.4367 132.285L111.532 127.155C115.424 125.738 119.728 127.745 121.145 131.637L131.406 159.828C132.822 163.72 130.815 168.024 126.923 169.441L112.828 174.571C108.935 175.988 104.631 173.981 103.215 170.089L92.9541 141.898Z" fill="url(#paint3_linearad)" />
                                    <path d="M103.215 59.9369C104.631 56.0446 108.935 54.0377 112.828 55.4544L126.923 60.5847C130.815 62.0014 132.822 66.3052 131.406 70.1975L121.145 98.3884C119.728 102.281 115.424 104.288 111.532 102.871L97.4367 97.7406C93.5444 96.3239 91.5374 92.0201 92.9541 88.1278L103.215 59.9369Z" fill="url(#paint4_linearae)" />
                                </g>
                            </svg>
                        </div>
                        <div className="tsec">
                            <div>
                                <h1 className="lanhead m-b-50 m-t-0 fw-700">Real-time price updates</h1>
                                <p className="fs-20 imgtext t-g ">Kardia info is there to ensure that all the information is easily accessible, up to date and presented with a simple to navigate design.
                                    <br />
                                    <br />
                                    <br />
                                    <Link className="t-bl t-d-none" to="./tokens">Tokens Page</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gwrap p-b-100">
                    <div className="tgsec p-t-100 p-b-100 p-l-50">
                        <div className="l">
                            <div className="">
                                <h1 className="t-w lanhead m-b-50 fw-700">Kardia info Telegram bot</h1>
                                <p className="t-w fs-20 imgtext">
                                    Get the latest info with a simple message in PMs or Group chats
                                    <br />
                                    <br />
                                    <br />
                                    <a className="t-bl t-d-none" rel="noreferrer" target="_blank" href="https://t.me/KardiaInfo_bot">t.me/KardiaInfo_bot</a>
                                </p>
                            </div>
                        </div>
                        <div className="r p-l-20 p-r-20">
                            <img className="phoneimg m-b-50 m-t-50" alt="telegram bot" src="./img/tgbot.png"></img>
                        </div>
                    </div>
                    <h1 className="apit m-t-100 m-b-50 lanhead fw-700">Kardia Info <span className="fw-900 fs-40 t-t">API</span></h1>
                    <p className="t-g fs-20 imgtext">The backend service for kardiainfo allows for very quick loading times and the ability to fetch historical price data for each KRC-20 token with just 1 request.
                        <br />
                        <br />
                        <br />
                        <a className="t-bl t-d-none m-b-150" rel="noreferrer" target="_blank" href="https://api.kardiainfo.com">api.kardiainfo.com</a>
                    </p>
                </div>
                <div className="inftok p-t-100 p-b-100">
                    <div className="l">
                        <img className="phoneimg" alt="token" src="./../img/tokenspinning.gif"></img>
                    </div>
                    <div className="r">
                        <div>
                            <h1 className="m-b-50 lanhead fw-700">INFO Token</h1>
                            <p className="t-g fs-20 imgtext">
                                A token that will be filled with use cases that do not yet exist anywhere in the DeFi world. Sound tokenomics that ensure minimal inflationary pressures and maximum incentive to hold.
                                <br />
                                <br />
                                <br />
                                <a className="t-bl t-d-none" href="Whitepaper.pdf">
                                    Learn more by reading the <br /><span className="fs-14 t-bl">*unpolished edition of the*</span><br /> whitepaper
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="blsec p-t-100 p-b-100">
                    <div>
                        <h1 className="m-b-50 t-w lanhead fw-700">Want to learn more?</h1>
                        <p className="t-w fs-20 imgtext">
                            Join the Kardia info group chat and ask away
                            <br />
                            <br />
                            <br />
                            <a className="t-bl t-d-none" href="https://t.me/kardiainfo">
                                t.me/kardiainfo
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
