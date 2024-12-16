import * as React from "react"
const TwitterIcon = ({ width, bgFill }) => (
    <svg
        width={width || "1em"}
        height={width || "1em"}
        fill="none"
        {...props}
    >
        <g clipPath="url(#a)">
            <path fill="#fff" d="M.742.834h18.593v21.249H.742z" />
            <path
                fill={bgFill || "#000"}
                d="M3.398 2.162A2.659 2.659 0 0 0 .742 4.818v13.28a2.659 2.659 0 0 0 2.656 2.657h13.28a2.659 2.659 0 0 0 2.657-2.656V4.819a2.659 2.659 0 0 0-2.656-2.657H3.399Zm12.33 3.486-4.307 4.922 5.067 6.699H12.52l-3.104-4.063-3.557 4.063H3.888l4.607-5.267-4.86-6.354h4.067l2.81 3.715 3.245-3.715h1.972ZM14.16 16.09 7.109 6.765H5.934l7.13 9.325h1.096Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M.742.834h18.593v21.249H.742z" />
            </clipPath>
        </defs>
    </svg>
)
export default TwitterIcon
