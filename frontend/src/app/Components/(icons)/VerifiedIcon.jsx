import * as React from "react"
const VerifiedIcon = ({ width, fill }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || 12}
        height={width || 12}
        fill="none"
    >
        <path
            fill={fill || "#44C151"}
            fillRule="evenodd"
            d="M6 12A6 6 0 1 0 6-.001 6 6 0 0 0 6 12Zm-.155-3.573 3.334-4-1.024-.854-2.867 3.44-1.483-1.484-.943.942 2 2 .516.516.467-.56Z"
            clipRule="evenodd"
        />
    </svg>
)
export default VerifiedIcon
