import styles from '@/app/Components/(Dashbords)/SellPromptComp/secondstep/Second.module.css'
import GradientButton from '@/app/Components/GradientButton/GradientButton';
import FieldInfo from '@/app/Components/(liteComponents)/FieldInfo/FieldInfo';
import TextArea from '@/app/Components/(liteComponents)/TextAreaComponent/TextArea';
import InputField from '@/app/Components/(liteComponents)/InputField/InputField';

const Second = ({ onNext, onSelect, onChange }) => {
    return (
        <div className={styles.parentContainer}>
            {/* heading */}
            <h2 className={styles.heading}>Prompt Details</h2>

            {/* info text */}
            <div className={styles.infoContainer}>
                <p>Please provide the essential information for your prompt. Fill in the fields below to specify the title, a brief description, and the price. This will help us understand your offering better!</p>
            </div>

            {/* .............................  */}
            <div className={styles.section}>
                <FieldInfo title="Prompt Type" description="Select the type of prompt you want to sell" />

                {/* promptType */}
                <select className="select" defaultValue="Select Prompt Type" name="promptType" id="promoptType" onChange={onChange} onClick={onSelect}>
                    <option key="Select Prompt Type" value="Select Prompt Type" disabled>Select Prompt Type</option>
                    <option key="Dall-E" value="Dall-E">Dall-E</option>
                    <option key="Midjourney" value="Midjourney">Midjourney</option>
                    <option key="GPT" value="GPT">GPT</option>
                    {/* <option key="Leonardo Ai" value="Leonardo Ai">Leonardo Ai</option> */}
                    {/* <option key="Llama" value="Llama">Llama</option> */}
                    {/* <option key="Stable Diffusion" value="Stable Diffusion">Stable Diffusion</option> */}
                </select>
            </div>


            {/* name field */}
            <div className={styles.section}>
                <FieldInfo title="Name" description="Suggest a title for this prompt." />
                <InputField
                    placeholder="Movie to Emoji Generator"
                    name="title"
                    id="title"
                    onchangeFunc={onChange}
                />
            </div>

            {/* textArea field */}
            <div className={styles.section}>
                <FieldInfo title="Description" description="Describe what your prompt does to a potential buyer. A more detailed description will increase your sales." />
                <TextArea placeholder="Movie to Emoji Generator" rows="3" name="description" id="description" onChange={onChange} />
            </div>

            {/* price */}
            <div className={styles.section}>
                <FieldInfo title="Estimated Price" description="What do you think the price of this prompt should be?" />
                <div className={styles.pricingContainer}>
                    <select className="select" name="price" id="price" onChange={onChange} style={{ width: '100px' }}>
                        <option key="2.99" value="2.99">$2.99</option>
                        <option key="3.99" value="3.99">$3.99</option>
                        <option key="4.99" value="4.99">$4.99</option>
                        <option key="5.99" value="5.99">$5.99</option>
                        <option key="6.99" value="6.99">$6.99</option>
                    </select>
                </div>
            </div>

            {/* button */}
            <GradientButton title="Next" onClick={onNext} />

        </div>
    )
}

export default Second;