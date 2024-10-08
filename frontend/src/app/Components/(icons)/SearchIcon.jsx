import * as React from "react"
const SearchIcon = ({ fill, width, height }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || 23}
        height={height || 28}
        fill="none"
    >
        <rect
            width={12.5}
            height={12.5}
            x={2.75}
            y={5.75}
            stroke={fill || "#205B26"}
            strokeWidth={1.5}
            rx={6.25}
        />
        <path
            fill={fill || "#205B26"}
            d="M19.6 26.05a.75.75 0 1 0 1.2-.9l-1.2.9Zm-7.2-9.6 7.2 9.6 1.2-.9-7.2-9.6-1.2.9Z"
        />
    </svg>
)
export default SearchIcon;
