import React, { Component } from 'react'
import Cards from './components/subcomponents/svgs/Cards';
import Playsvg from './components/subcomponents/svgs/Playsvg'
import Altlogo from './components/subcomponents/svgs/Altlogo';

export default class ICO extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="ico">
                <div className="icoWarapper">
                    <div className="top">
                        <p className="p-t-0 m-t-0 m-b-24 fs-24 t-ab">ICO Stats</p>
                        <div className="ico-info">
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">On Sale</p>
                                <p className="fs-32 t-ab p-t-10">500,000 <span className="t-s"> INFO</span></p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.666504" width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M34.6666 20.5C34.6666 23.76 32.2666 26.45 29.1466 26.92V26.86C28.8366 22.98 25.6866 19.83 21.7766 19.52H21.7466C22.2166 16.4 24.9066 14 28.1666 14C31.7566 14 34.6666 16.91 34.6666 20.5Z" fill="#9699A5" />
                                    <path d="M27.6465 26.98C27.3965 23.81 24.8565 21.27 21.6865 21.02C21.5165 21.01 21.3365 21 21.1665 21C17.5765 21 14.6665 23.91 14.6665 27.5C14.6665 31.09 17.5765 34 21.1665 34C24.7565 34 27.6665 31.09 27.6665 27.5C27.6665 27.33 27.6565 27.15 27.6465 26.98ZM22.0465 28.38L21.1665 30L20.2865 28.38L18.6665 27.5L20.2865 26.62L21.1665 25L22.0465 26.62L23.6665 27.5L22.0465 28.38Z" fill="#9699A5" />
                                </svg>
                            </div>
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">Price / INFO</p>
                                <p className="fs-32 t-ab p-t-10">10.53 <span className="t-s"> KAI</span></p>
                                <p className="fs-14 t-lbl p-t-10">$0.531</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.333008" width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M21.0049 26.3298C21.0049 27.6198 21.9949 28.6598 23.2249 28.6598H25.7349C26.8049 28.6598 27.6749 27.7498 27.6749 26.6298C27.6749 25.4098 27.1449 24.9798 26.3549 24.6998L22.3249 23.2998C21.5349 23.0198 21.0049 22.5898 21.0049 21.3698C21.0049 20.2498 21.8749 19.3398 22.9449 19.3398H25.4549C26.6849 19.3398 27.6749 20.3798 27.6749 21.6698" stroke="#9699A5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M24.333 18V30" stroke="#9699A5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">Deposited</p>
                                <p className="fs-32 t-ab p-t-10">21,334,784 <span className="t-s"> KAI</span></p>
                                <p className="fs-14 p-t-10 t-lbl">$278,512,39</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M30.0702 26.4301L24.0002 32.5001L17.9302 26.4301" stroke="#9699A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M24 15.5V32.33" stroke="#9699A5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="middle p-t-155">
                        <div className="myicostats">
                            <div className="left pos-r">
                                <Cards cn="ab-c-b" />
                            </div>
                            <div className="right w-full p-t-30 p-b-30 p-r-30">
                                <div className="ico-mystats">
                                    <div className="ico-top-stats p-b-30">
                                        <span className="fs-24 t-ag">My Stats</span>
                                        <div className="clock">
                                            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#E99E35" strokeOpacity="0.52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51001" stroke="#E99E35" strokeOpacity="0.52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="m-l-12 fs-16 t-org">3d 16h 54m 44s</span>
                                        </div>
                                    </div>

                                    <div className="ico-mynums">
                                        <div className="l">
                                            <p className="fs-16 t-g m-t-0 m-b-10">Kai Deposited</p>
                                            <p className="fs-24 t-ab m-t-0 m-b-10">2,750 <span className="t-s fs-24">KAI</span></p>
                                            <p className="t-lbl fs-14 m-t-0 m-b-0">$51.98</p>
                                        </div>
                                        <div className="r">
                                            <p className="fs-16 t-g m-t-0 m-b-10">Receive</p>
                                            <p className="fs-24 t-ab m-t-0 m-b-10">103.95 <span className="t-s fs-24">INFO</span></p>
                                            <p className="t-lbl fs-14 m-t-0 m-b-0">0.021 %</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btm m-b-100">
                        <div className="l">
                            <p className="t-ab fs-24 m-t-0 m-b-22">Kardia info ICO</p>
                            <p className="t-g fs-16 m-b-28 p-r-60">The Info Token (INFO) is a revolutionary, deflationary, information backed token - The Chainlink for KardiaChain. It is now available for sale through the First ICO ever on KardiaChain.</p>
                            <button className="hpbtn-tr bg-white m-r-25">
                                Token Metrics
                            </button>
                            <a className="fs-18 t-lg">
                                ICO Information
                            </a>
                                
                        </div>
                        <div className="r">
                            <Playsvg />
                        </div>
                    </div>
                </div>
                <div className="footer dk pos-r">
                    <div>
                        <Altlogo />
                        <p className="hp-g fs-15">© 2021 KardiaInfo. All rights reserved.</p>
                    </div>
                    <div>
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
                    <div>
                        <a className="m-r-20 t-d-none fs-15 hp-g" href="https://docs.kardiainfo.com">Docs</a>
                        <a className="t-d-none fs-15 hp-g" href="https://t.me/dima3553">Contact</a>
                    </div>
                </div>
            </div>
        )
    }
}
