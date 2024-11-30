import React, { useEffect } from 'react'
import styles from '@/app/Components/(updatedDesignComp)/NewSearchInput/NewSearchInput.module.css'
import CheveronIcon from '../../(icons)/CheveronIcon'
import SearchIcon from '../../(icons)/SearchIcon'
import { useState } from 'react'

const aiTools = [
    {
        tool: 'GPT',
        placeholder: 'Search for GPT conversation starters...'
    },
    {
        tool: 'DALL-E',
        placeholder: 'Search for DALL·E image prompts...'
    },
    // {
    //     tool: 'Stable Diffusion',
    //     placeholder: 'Search for Stable Diffusion prompts...'
    // },
    {
        tool: 'Midjourney',
        placeholder: 'Search for MidJourney prompts...'
    }
]

const NewSearchInput = () => {

    let screenWidth;
    if (typeof window !== 'undefined') {
        screenWidth = window.screen.width;
    }

    const [isActiveDropdown, setisActiveDropdown] = useState(false)
    const [dropdownText, setdropdownText] = useState('AI Tool')
    const [placeholder, setplaceholder] = useState('Search email template...');
    const [placeholderWidth, setplaceholderWidth] = useState('0px')
    const dropdownFunc = () => {
        setisActiveDropdown(prev => !prev)
    }

    const hideDropdown = () => {
        setisActiveDropdown(false)
    }

    const selectDropdownFunc = (tool, placeholder) => {
        setdropdownText(tool)
        setplaceholder(placeholder)
        setisActiveDropdown(false)
    }

    useEffect(() => {
        hideDropdown()
        setplaceholderWidth('300px')
        setTimeout(() => {
            setplaceholderWidth('0px')
        }, 200);
    }, [dropdownText])


    return (
        <div className={styles.parentContainer}>
            <div className={styles.dropdownContainer} onClick={dropdownFunc}>
                <span className={styles.selectedText}>{screenWidth < '450' ? dropdownText.slice(0, 6) : dropdownText}</span>
                <div
                    className={styles.cheveron}
                    style={{
                        transform: isActiveDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                >
                    <CheveronIcon width={'20'} />
                </div>
                <ul
                    className={styles.dropdown}
                    onMouseLeave={hideDropdown}
                    style={{
                        height: isActiveDropdown ? '150px' : '0px'
                    }}
                >
                    {
                        aiTools.map((tools, index) =>
                            <li key={index} onClick={() => selectDropdownFunc(tools.tool, tools.placeholder)}>{tools.tool}</li>
                        )
                    }
                </ul>
            </div>

            <div className={styles.inputTextContainer}>
                <div
                    className={styles.placeholderCover}
                    style={{ width: placeholderWidth }}
                ></div>
                <input placeholder={placeholder} type="text" className={styles.input} />
            </div>
            <div className={styles.searchIcon}>
                <SearchIcon />
            </div>
        </div>
    )
}

export default NewSearchInput