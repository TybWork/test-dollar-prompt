import * as React from "react"
const FacebookIcon = ({ width }) => (
    <svg
        width={width || 22}
        height={width || 22}
        fill="none"
    >
        <g clipPath="url(#a)">
            <path fill="#fff" d="M.248.834h21.249v21.249H.248z" />
            <path
                fill="#1877F2"
                d="M21.497 11.459C21.497 5.59 16.74.834 10.873.834 5.005.834.248 5.591.248 11.459c0 5.302 3.885 9.698 8.964 10.495V14.53H6.515v-3.071h2.697V9.117c0-2.663 1.587-4.134 4.014-4.134 1.162 0 2.378.208 2.378.208v2.614h-1.34c-1.32 0-1.731.82-1.731 1.66v1.993h2.946l-.47 3.07h-2.476v7.425c5.079-.797 8.964-5.192 8.964-10.495Z"
            />
            <path
                fill="#fff"
                d="m15.009 14.53.471-3.072h-2.947V9.465c0-.84.412-1.659 1.732-1.659h1.34V5.191s-1.216-.207-2.379-.207c-2.427 0-4.013 1.47-4.013 4.133v2.341H6.516v3.071h2.697v7.425a10.706 10.706 0 0 0 3.32 0v-7.425h2.476Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M.248.834h21.249v21.249H.248z" />
            </clipPath>
        </defs>
    </svg>
)
export default FacebookIcon
