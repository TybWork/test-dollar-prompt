import * as React from "react"
const HeartIcon = ({ width, stroke, fill }) => (
    <svg
        width={width || 20}
        height={width || 20}
        fill={fill || 'none'}
    >
        <path
            stroke={stroke || "#8FAD92"}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.386 15.306a1.363 1.363 0 0 1-.775 0c-1.813-.62-5.863-3.2-5.863-7.575a3.484 3.484 0 0 1 3.475-3.494c1.138 0 2.144.55 2.775 1.4a3.456 3.456 0 0 1 2.775-1.4 3.484 3.484 0 0 1 3.475 3.494c0 4.375-4.05 6.956-5.863 7.575Z"
        />
    </svg>
)
export default HeartIcon
