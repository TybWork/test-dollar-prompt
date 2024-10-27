import * as React from "react"
const UploadIcon = ({ className }) => (
    <svg
        width="1em"
        height="1em"
        fill="red"
        stroke="currentColor"
        strokeWidth={0}
        className={className}
        viewBox="0 0 512 512"
    >
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            // strokeWidth={stroke || 2}
            d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"
        />
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            // strokeWidth={stroke || 2}
            d="m320 255.79-64-64-64 64m64 192.42V207.79"
        />
    </svg>
)
export default UploadIcon
