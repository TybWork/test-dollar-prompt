import React from 'react'
import styles from '@/app/Components/(liteComponents)/SampleTextPromptComp/SampleTextPromptComp.module.css'

const SampleTextPromptComp = ({ promptType, maxHeight, samplePromptsArr }) => {
    return (
        <div
            className={styles.sampleTextContainer}
            style={{
                display: promptType === 'dall-e' || promptType === 'midjourney' ? 'none' : 'flex',
                maxHeight: maxHeight
            }}
        >
            {
                samplePromptsArr && samplePromptsArr.length > 0 ? (
                    samplePromptsArr.map((example) =>
                        <div className={styles.singleSample}>
                            <h4 className={styles.sampleHeading}>
                                {example.title}
                            </h4>
                            <p className={styles.sampleText}>
                                {
                                    example.text
                                }
                            </p>
                        </div>
                    )
                ) : (
                    <div>Looks like there are no sample prompts</div>
                )
            }
        </div>
    )
}

export default SampleTextPromptComp