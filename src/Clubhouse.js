import React, { Component } from 'react'

export default class Clubhouse extends Component {
    render() {
        return (
            <div className="clubhouse">
                <div className="icoWarapper">
                    <div className="top m-b-80">
                        <p className="p-t-0 m-t-0 p-l-40 m-b-24 fs-24 t-ab icot">ICO Clubhouse stats</p>
                        <div className="ico-info p-t-10 p-b-10">
                            <div className="ico-info-box  m-l-40 tp">
                                <p className="fs-16 t-g fw-700 ">Time left</p>
                                <p className="fs-32 t-ab p-t-10 bb">150 <span className="t-s"> Days</span></p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.666504" width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M34.6666 20.5C34.6666 23.76 32.2666 26.45 29.1466 26.92V26.86C28.8366 22.98 25.6866 19.83 21.7766 19.52H21.7466C22.2166 16.4 24.9066 14 28.1666 14C31.7566 14 34.6666 16.91 34.6666 20.5Z" fill="#9699A5" />
                                    <path d="M27.6465 26.98C27.3965 23.81 24.8565 21.27 21.6865 21.02C21.5165 21.01 21.3365 21 21.1665 21C17.5765 21 14.6665 23.91 14.6665 27.5C14.6665 31.09 17.5765 34 21.1665 34C24.7565 34 27.6665 31.09 27.6665 27.5C27.6665 27.33 27.6565 27.15 27.6465 26.98ZM22.0465 28.38L21.1665 30L20.2865 28.38L18.6665 27.5L20.2865 26.62L21.1665 25L22.0465 26.62L23.6665 27.5L22.0465 28.38Z" fill="#9699A5" />
                                </svg>
                            </div>
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">APR</p>
                                <p className="fs-32 t-ab p-t-10 bb">320 <span className="t-s"> %</span></p>
                                <p className="fs-14 t-lbl p-t-10">1000 INFO per day</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.333008" width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M21.0049 26.3298C21.0049 27.6198 21.9949 28.6598 23.2249 28.6598H25.7349C26.8049 28.6598 27.6749 27.7498 27.6749 26.6298C27.6749 25.4098 27.1449 24.9798 26.3549 24.6998L22.3249 23.2998C21.5349 23.0198 21.0049 22.5898 21.0049 21.3698C21.0049 20.2498 21.8749 19.3398 22.9449 19.3398H25.4549C26.6849 19.3398 27.6749 20.3798 27.6749 21.6698" stroke="#9699A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M24.333 18V30" stroke="#9699A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">Deposited</p>
                                <p className="fs-32 t-ab p-t-10 bb">233,144 <span className="t-s"> INFO</span></p>
                                <p className="fs-14 p-t-10 t-lbl">$201,335</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M30.0702 26.4301L24.0002 32.5001L17.9302 26.4301" stroke="#9699A5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M24 15.5V32.33" stroke="#9699A5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="ch-bot">
                        <div className="ch-bg m-b-100">
                            <div className="ch-overlay">
                                <div>
                                    <h3 className="fs-24 m-b-25 fw-700 t-ab">Join the Clubhouse</h3>
                                    <p className="fs-18 t-g m-b-40 fw-100">
                                        Luxury ICO buyers club - Stake INFO for 150 days to earn more INFO.
                                    </p>
                                </div>
                                <div className="ch-info">
                                    <p className="fs-13 t-g m-b-10 t-g">
                                        My INFO in the club
                                    </p>
                                    <p className="fs-32 m-t-0 fw-700 m-b-25">
                                        61,025 <span className="t-s">INFO</span>
                                    </p>
                                    <p className="fs-16 t-g m-b-5">
                                        Rewards to claim: <span className="t-bl">31.55 INFO</span>
                                    </p>
                                    <p className="fs-16 t-g m-b-30">
                                        Weak hand tax: <span className="t-or">20.4 %</span>
                                    </p>
                                    <button className="clbtn m-b-5 fs-16">
                                        Claim Rewards
                                    </button>
                                    <p className="txt-c fs-16 t-g">
                                        Unstake INFO
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
