import * as React from "react"
const CheveronIcon = ({ width, stroke }) => (
    <svg
        width={width || 16}
        height={width / 2 || 9}
        fill="none"
    >
        <path
            stroke={stroke || "#205B26"}
            strokeLinecap="round"
            strokeWidth={1.313}
            d="m1 1.5 5.763 5.763a1.75 1.75 0 0 0 2.474 0L15 1.5"
        />
    </svg>
)
export default CheveronIcon
