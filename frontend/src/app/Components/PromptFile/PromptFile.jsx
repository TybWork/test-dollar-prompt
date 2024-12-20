'use client'
import styles from "@/app/Components/PromptFile/PromptFile.module.css"
import FieldInfo from "../(liteComponents)/FieldInfo/FieldInfo"
import DropDownList from "../(liteComponents)/DropDownList/DropDownList"
import TextArea from "../(liteComponents)/TextAreaComponent/TextArea"
import GradientButton from "../GradientButton/GradientButton"
import { useState } from "react"
const PromptFile = () => {

    const [sellPromptBtn, setsellPromptBtn] = useState('block')
    function clickTest() {
        setsellPromptBtn("none")
    }
    return (
        <div className={styles.parentContainer} style={{ display: sellPromptBtn }}>
            <h2 className={styles.heading}>Prompt File</h2>

            {/* version */}
            <FieldInfo title="Version" description="Select the version of DALL-E you're using." />

            {/* dropdown */}
            <DropDownList />

            {/* prompt */}
            <FieldInfo title="*Prompt" description="Put any variables in [square brackets]." />
            <TextArea placeholder="An Impressionist oil painting of [Flower] in a purple vase.." rows="18" />


            {/* *Testing Prompt */}
            <FieldInfo title="*Testing Prompt" description="One example of your prompt with all variables filled in, e.g. [animal] -> koala. We'll use this to test <br/> your prompt - buyers will not see this. Do not include any instructions here." />
            <TextArea placeholder="An Impressionist oil painting of rose in a purple vase.." rows="18" />

            {/* *Prompt Instructions */}
            <FieldInfo title="*Prompt Instructions" description="Any extra tips or examples for the buyer on how to use this prompt." />
            <TextArea placeholder="To get the most out of this prompt you need to.." rows="18" />

            {/* *Example images */}
            <FieldInfo title="*Example images" description="Upload 9 example images generated by this prompt (no collages or edits)" />
            <div className={styles.uploadImage}>+</div>

            {/* next button */}
            <div className={styles.nextBtn}>
                <GradientButton title="Next" onClick={clickTest} />
            </div>

        </div>
    )
}

export default PromptFile;