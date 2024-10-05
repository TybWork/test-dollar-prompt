import * as React from "react"
const EyeIcon = ({ width, stroke }) => (
    <svg
        width={width || 20}
        height={width || 20}
        fill="none"
    >
        <path
            stroke={stroke || "#8FAD92"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.984 10a2.98 2.98 0 0 1-2.983 2.983A2.98 2.98 0 0 1 7.018 10 2.98 2.98 0 0 1 10 7.017 2.98 2.98 0 0 1 12.984 10Z"
        />
        <path
            stroke={stroke || "#8FAD92"}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 16.892c2.941 0 5.683-1.734 7.591-4.734.75-1.175.75-3.15 0-4.325-1.908-3-4.65-4.733-7.591-4.733-2.942 0-5.683 1.733-7.592 4.733-.75 1.175-.75 3.15 0 4.325 1.909 3 4.65 4.734 7.592 4.734Z"
        />
    </svg>
)
export default EyeIcon
