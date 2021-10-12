import React from 'react'
import { Link } from 'react-router-dom'
import Oraclesvg from './subcomponents/svgs/Oraclesvg'
import OrbitKai from './subcomponents/svgs/OrbitKai'
import Tgbot from './subcomponents/svgs/Tgbot'
import Infosvg from './subcomponents/svgs/Infosvg'
import Playsvg from './subcomponents/svgs/Playsvg'
import Altlogo from './subcomponents/svgs/Altlogo'

export default function Homesmall(props) {
    return (
        <div className="hpwrapper small">
            <div className="smtopsec">
                <div className="smwrapper">
                    <div className="top orbit">
                        <OrbitKai img1={props.img1} img2={props.img2} img3={props.img3} img4={props.img4} />
                    </div>
                    <div className="bottom p-l-20 p-r-20">
                        <div className="smtxtsec">
                            <h1 className="fs-40 fw-600 txt-c">Get the latest KardiaChain<br /> stats in one place</h1>
                            <p className="hp-g fs-18 lh-1-8 txt-c"> With Kardia info - you will have quick access to information regarding all things kardiachain.</p>
                            <br />
                            <br />
                            <br />
                            <Link className="t-d-none" to="/tokens">
                                <button className="hpbtn-bl m-b-15 c-pointer">View Tokens</button>
                            </Link>
                            <Link className="t-d-none" to="/lps">
                                <button className="hpbtn-tr m-b-150 c-pointer">View Pairs</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="transec">
                    <div className="whitecurve ab-c-t"></div>
                </div>
                <div className="blsecsm">
                    <div className="smwrapper p-l-20 p-r-20">
                        <div className="smtxtsec m-t-50">
                            <h1 className="fs-32 fw-600 txt-c">
                                Real-time price updates
                            </h1>
                            <p className="hp-g fs-18 txt-c lh-1-8">Kardia info is there to ensure that all the information is easily accessible, up to date and presented with a simple to navigate design.</p>
                            <Link className="t-d-none " to="/tokens">
                                <button className="hpbtn-tr-svg m-b-50 c-pointer m-r-auto m-l-auto d-block">View more
                                    <svg className="ab-r-m m-r-20" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 16.0003L14 12.0003L10 8.00037" stroke="#226BF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </Link>
                            <Link className="t-d-none" to={"/tokens/" + props.tokens[0].symbol.replace(/\s+/g, '_')}>
                                <div className="hp-tok-sec m-b-22">
                                    <div className="d-flex al-c">
                                        <div className="hp-log m-r-24">
                                            <img alt=""  className="ab-c-m" src={props.tokens[0].logo}></img>
                                        </div>
                                        <div className="hp-name">
                                            <p className="m-t-0 fs-15 m-b-2">{props.tokens[0].symbol}</p>
                                            <p className="m-b-0 fw-400 fs-15 t-s m-t-0">{props.tokens[0].name}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex al-c">
                                        <div className="hp-change m-l-0 txt-r p-r-15">
                                            <p className="fw-600 fs-15 m-b-2 m-t-0">${(props.tokens[0].price).toFixed(4)}</p>
                                            <p className={"fs-15 m-b-0 m-t-0 " + props.col[0]}>{(props.tokens[0].dayChange).toFixed(2)}%</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link className="t-d-none" to={"/tokens/" + props.tokens[props.ran[1]].symbol.replace(/\s+/g, '_')}>
                                <div className="hp-tok-sec shad m-b-22">
                                    <div className="d-flex al-c">
                                        <div className="hp-log m-r-24">
                                            <img alt=""  className="ab-c-m" src={props.tokens[props.ran[1]].logo}></img>
                                        </div>
                                        <div className="hp-name">
                                            <p className="m-t-0 fs-15 m-b-2">{props.tokens[props.ran[1]].symbol}</p>
                                            <p className="m-b-0 fw-400 fs-15 t-s m-t-0">{props.tokens[props.ran[1]].name}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex al-c">
                                        <div className="hp-change m-l-0 txt-r p-r-15">
                                            <p className="fw-600 fs-15 m-b-2 m-t-0">${(props.tokens[props.ran[1]].price).toFixed(4)}</p>
                                            <p className={"fs-15 m-b-0 m-t-0 " + props.col[props.ran[1]]}>{(props.tokens[props.ran[1]].dayChange).toFixed(2)}%</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link className="t-d-none" to={"/tokens/" + props.tokens[props.ran[2]].symbol.replace(/\s+/g, '_')}>
                                <div className="hp-tok-sec m-b-150">
                                    <div className="d-flex al-c">
                                        <div className="hp-log m-r-24">
                                            <img alt=""  className="ab-c-m" src={props.tokens[props.ran[2]].logo}></img>
                                        </div>
                                        <div className="hp-name">
                                            <p className="m-t-0 fs-15 m-b-2">{props.tokens[props.ran[2]].symbol}</p>
                                            <p className="m-b-0 fw-400 fs-15 t-s m-t-0">{props.tokens[props.ran[2]].name}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex al-c">
                                        <div className="hp-change m-l-0 txt-r p-r-15">
                                            <p className="fw-600 fs-15 m-b-2 m-t-0">${(props.tokens[props.ran[2]].price).toFixed(4)}</p>
                                            <p className={"fs-15 m-b-0 m-t-0 " + props.col[props.ran[2]]}>{(props.tokens[props.ran[2]].dayChange).toFixed(2)}%</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="transoc m-b-60">
                    <div className="bluecurve ab-c-t"></div>
                </div>
                <div className="smwrapper p-r-20 p-l-20">
                    <div className="top">
                        <Tgbot />
                    </div>
                    <div className="smtxtsec m-t-50">
                        <h1 className="fs-32 fw-600 txt-c">
                            Kardia info Telegram bot
                        </h1>
                        <p className="hp-g fs-18 txt-c lh-1-8">Get the latest info with a simple message in PMs or Group chats. already avialable in numerous groupchats in the kardiachain community.</p>
                        <br />
                        <a href="https://t.me/Kardia_info_bot">
                            <button className="hpbtn-tr-svg c-pointer m-b-150">Message the Ki bot
                                <svg className="ab-r-m m-r-20" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0ccc)">
                                        <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346641 6.40034 -0.154961 8.00887 0.153721 9.56073C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.1549 9.59967 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7601 14.6517 12.4445C15.5308 11.1289 16 9.58227 16 8C16 5.87827 15.1571 3.84343 13.6569 2.34315C12.1565 0.842853 10.1217 0 8 0ZM8 14.9029C6.63063 14.9029 5.29204 14.4965 4.15368 13.7354C3.01533 12.9743 2.12839 11.8925 1.60513 10.6271C1.08188 9.3616 0.945847 7.96933 1.21425 6.62651C1.48265 5.2837 2.14342 4.05071 3.11292 3.08361C4.08241 2.11652 5.31704 1.45881 6.66052 1.19374C8.004 0.928667 9.39593 1.06815 10.6601 1.59455C11.9242 2.12093 13.0038 3.01055 13.7621 4.15079C14.5204 5.29103 14.9234 6.63063 14.92 8C14.9185 9.8348 14.1889 11.5941 12.8915 12.8915C11.5941 14.1889 9.83487 14.9185 8 14.92V14.9029Z" fill="#226BF6" />
                                        <path d="M9.92 4.06285L4.00001 6.03428C3.71221 6.12596 3.45638 6.29752 3.2623 6.52896C3.06822 6.76041 2.94388 7.04221 2.90377 7.34161C2.86366 7.64101 2.90941 7.94561 3.0357 8.21994C3.162 8.49434 3.36364 8.72721 3.61716 8.89141L5.50287 10.1485C5.57786 10.1869 5.64871 10.2329 5.7143 10.2857C5.76392 10.3349 5.82278 10.3739 5.88749 10.4004C5.95221 10.4269 6.02152 10.4403 6.09144 10.44C6.2287 10.4377 6.35975 10.3824 6.45716 10.2857L7.80573 8.93714C7.90573 8.83714 7.96193 8.70148 7.96193 8.56001C7.96193 8.41854 7.90573 8.28288 7.80573 8.18288C7.70573 8.08281 7.57007 8.02661 7.4286 8.02661C7.28713 8.02661 7.15146 8.08281 7.05146 8.18288L6.02858 9.20568L4.21144 8.00001C4.12963 7.94461 4.06487 7.86754 4.02443 7.77734C3.98401 7.68721 3.96951 7.58761 3.98256 7.48968C3.99562 7.39174 4.03572 7.29941 4.09835 7.22301C4.16099 7.14654 4.24369 7.08914 4.33716 7.05714L10.2515 5.08571C10.3454 5.05374 10.4465 5.04872 10.5431 5.07122C10.6398 5.09372 10.7282 5.14285 10.7984 5.21304C10.8686 5.28322 10.9177 5.37165 10.9402 5.46832C10.9627 5.56499 10.9577 5.66603 10.9257 5.75999L8.96 11.6629C8.92993 11.7583 8.87293 11.843 8.79593 11.9069C8.71887 11.9707 8.62506 12.011 8.52573 12.0229C8.42666 12.0361 8.3258 12.0212 8.23486 11.9797C8.14386 11.9383 8.06647 11.872 8.01147 11.7885L7.44 10.9543C7.40753 10.8861 7.36093 10.8255 7.3032 10.7767C7.24553 10.728 7.17806 10.6921 7.1054 10.6714C7.03273 10.6508 6.95647 10.6459 6.88173 10.657C6.807 10.6681 6.73553 10.6951 6.67206 10.7361C6.60855 10.777 6.55453 10.8311 6.51357 10.8945C6.47262 10.958 6.44566 11.0295 6.43452 11.1043C6.42338 11.1789 6.4283 11.2552 6.44896 11.3279C6.46961 11.4005 6.50553 11.468 6.5543 11.5257L7.12573 12.36C7.2704 12.5794 7.4672 12.7595 7.6986 12.8842C7.92993 13.0089 8.1886 13.0741 8.45147 13.0743H8.66286C8.95906 13.0358 9.2384 12.9146 9.46887 12.7246C9.69933 12.5345 9.87153 12.2834 9.96573 12L11.9371 6.08571C12.0331 5.80382 12.0481 5.5007 11.9806 5.21069C11.9131 4.92068 11.7657 4.65538 11.5552 4.44483C11.3446 4.23428 11.0793 4.0869 10.7893 4.01939C10.4993 3.95188 10.1962 3.96694 9.91426 4.06285H9.92Z" fill="#226BF6" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0ccc">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </a>
                    </div>
                    <div className="top">
                        <Oraclesvg />
                    </div>
                    <div className="smtxtsec m-t-50">
                        <h1 className="fs-32 fw-600 txt-c">
                            Kardia Info Oracle
                        </h1>
                        <p className="hp-g fs-18 txt-c lh-1-8">The backend service for kardiainfo allows for very quick loading times and the ability to fetch historical price data for each KRC-20 token with just 1 request for both smart contracts and Apps.</p>
                        <br />
                        <a href="https://docs.kardiainfo.com/features-and-services/info-oracle-api-v1">
                            <button className="hpbtn-tr-svg c-pointer m-b-120">View the docs
                                <svg className="ab-r-m m-r-20" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 16.0003L14 12.0003L10 8.00037" stroke="#226BF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </a>
                    </div>
                    <div className="top">
                        <Infosvg />
                    </div>
                    <div className="smtxtsec m-t-50">
                        <h1 className="fs-32 fw-600 txt-c">
                            Info Token
                        </h1>
                        <p className="hp-g fs-18 txt-c lh-1-8">A token filled with use cases that do not yet exist anywhere in the DeFi world. Sound tokenomics that create deflation and maximum incentive to hold.</p>
                        <br />
                        <a href="https://docs.kardiainfo.com/about-kardia-info/info-token-info">
                            <button className="hpbtn-tr-svg c-pointer m-b-100">Learn more
                                <svg className="ab-r-m m-r-20" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 16.0003L14 12.0003L10 8.00037" stroke="#226BF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </a>
                    </div>
                    <div className="top">
                        <Playsvg />
                    </div>
                    <div className="smtxtsec m-t-50">
                        <h1 className="fs-32 fw-600 txt-c">
                            Kardia Info Game
                        </h1>
                        <p className="hp-g fs-18 txt-c lh-1-8">An amazing use case for the Info Token. This game allows you to multiply your bet by up to x4750. Or to stake and receive a portion of the revenue generated by the game.</p>
                        <br />
                        <a href="https://kardiainfo.com/game"><button className="hpbtn-bl m-b-15 c-pointer">Play the Game</button></a>
                        <a href="https://docs.kardiainfo.com/info-game">
                            <button className="hpbtn-tr-svg c-pointer m-b-100">Learn more
                                <svg className="ab-r-m m-r-20" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 16.0003L14 12.0003L10 8.00037" stroke="#226BF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer pos-r">
                <div>
                    <Altlogo />
                    <p className="hp-g fs-15">© 2021 KardiaInfo. All rights reserved.</p>
                </div>
                <div className="m-t-10 m-b-10 m-r-15">
                    <a href="https://github.com" className="m-r-20">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.7919 1.71292C4.72094 1.78392 4.58544 2.22667 4.51009 2.6339C4.40936 3.17833 4.47584 4.08733 4.64596 4.49122C4.66113 4.52732 4.61813 4.60787 4.51819 4.73058C3.97118 5.40206 3.66386 6.15492 3.57538 7.0401C3.50918 7.70203 3.6247 8.8779 3.81789 9.5087C4.1377 10.5529 4.73288 11.3662 5.56673 11.8983C5.961 12.15 6.62568 12.4204 7.19988 12.5628C7.48886 12.6345 8.31612 12.7883 8.41259 12.7883C8.42936 12.7883 8.37912 12.8687 8.30088 12.9669C8.11075 13.2057 7.91749 13.6271 7.84156 13.9688L7.77958 14.2477L7.4727 14.349C6.87436 14.5467 6.38296 14.5625 5.89392 14.4C5.38589 14.2311 5.06901 13.9651 4.67981 13.3807C4.35558 12.8938 4.04353 12.5967 3.66403 12.4136C3.21781 12.1984 2.72261 12.1648 2.54935 12.338C2.4872 12.4001 2.48598 12.4128 2.53319 12.5033C2.59708 12.6256 2.71468 12.7339 3.00448 12.9374C3.43927 13.2426 3.79357 13.7086 4.05918 14.3247C4.24084 14.746 4.37599 14.9464 4.64463 15.1926C4.90688 15.4329 5.28578 15.6423 5.65297 15.75C6.00628 15.8535 6.92249 15.8814 7.37847 15.8024C7.55156 15.7724 7.70848 15.7479 7.72716 15.7479C7.74862 15.7479 7.76118 15.9852 7.76118 16.3912C7.76118 16.9271 7.77196 17.0691 7.82564 17.2416C7.99155 17.7747 8.43657 18.1813 8.97899 18.2954C9.09347 18.3194 9.63425 18.3333 10.4601 18.3333C11.5035 18.3333 11.7996 18.3233 11.9559 18.2825C12.5385 18.1308 12.9791 17.6807 13.0981 17.1155C13.1594 16.8245 13.1487 14.5025 13.0843 14.1337C12.996 13.6269 12.8003 13.1956 12.5275 12.9064C12.3974 12.7685 12.3754 12.7803 12.8993 12.707C15.3258 12.3673 16.7271 11.1794 17.1784 9.07977C17.3312 8.36862 17.3735 7.2401 17.2693 6.65026C17.1445 5.94278 16.7821 5.1739 16.3461 4.69128L16.23 4.5628L16.3215 4.2617C16.4058 3.98425 16.4131 3.91251 16.4149 3.34828C16.4169 2.71054 16.3947 2.54878 16.2316 2.01181C16.1262 1.66492 16.1071 1.65087 15.774 1.6754C15.1269 1.72303 14.218 2.09314 13.3782 2.65094L13.1655 2.79218L12.7 2.68938C11.978 2.52987 11.5151 2.47578 10.7038 2.45612C9.70539 2.4319 9.06962 2.49388 8.12983 2.70711L7.73308 2.79712L7.44127 2.60495C7.28077 2.49925 7.14303 2.41278 7.13514 2.41278C7.12725 2.41278 7.01468 2.35162 6.88501 2.27681C6.33333 1.95877 5.59337 1.70785 5.10609 1.67363C4.89426 1.65877 4.83922 1.66564 4.7919 1.71292Z" fill="#1C1C28" fillOpacity="0.54" />
                        </svg>
                    </a>
                    <a href="https://t.me/kardiainfo">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.788 17.3339C15.0295 17.5049 15.3407 17.5476 15.6182 17.4427C15.8957 17.3369 16.0997 17.0999 16.1612 16.8127C16.8129 13.7497 18.3939 5.99716 18.9871 3.21097C19.0321 3.00098 18.9571 2.78273 18.7921 2.64249C18.6271 2.50224 18.3984 2.46174 18.1944 2.53749C15.0497 3.70146 5.3652 7.33513 1.40679 8.79985C1.15554 8.89284 0.992049 9.13434 1.0003 9.39908C1.0093 9.66458 1.18779 9.89482 1.44504 9.97207C3.22025 10.5031 5.55044 11.2418 5.55044 11.2418C5.55044 11.2418 6.63942 14.5305 7.20716 16.2029C7.27841 16.4129 7.44265 16.5779 7.6594 16.6349C7.87539 16.6912 8.10639 16.6319 8.26763 16.4797C9.17961 15.6187 10.5896 14.2875 10.5896 14.2875C10.5896 14.2875 13.2685 16.2517 14.788 17.3339ZM6.53067 10.8263L7.78989 14.9797L8.06964 12.3495C8.06964 12.3495 12.9348 7.96137 15.7082 5.46017C15.7892 5.38667 15.8005 5.26368 15.733 5.17743C15.6662 5.09118 15.5432 5.07093 15.451 5.12943C12.2365 7.18213 6.53067 10.8263 6.53067 10.8263Z" fill="#1C1C28" fillOpacity="0.54" />
                        </svg>
                    </a>
                </div>
                <div className="m-t-10 m-b-10 m-r-15">
                    <a className="m-r-20 t-d-none fs-15 hp-g" href="https://docs.kardiainfo.com">Docs</a>
                    <a className="t-d-none fs-15 hp-g" href="https://t.me/dima3553">Contact</a>
                </div>
            </div>
        </div>
    )
}
