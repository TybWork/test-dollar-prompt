"use client";
import styles from "@/app/(Pages)/admin/review/[promptType]/[promptid]/Review.module.css";
import axios from "axios";
import FieldInfo from "@/app/Components/(liteComponents)/FieldInfo/FieldInfo";
import GradientButton from "@/app/Components/GradientButton/GradientButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/Components/(liteComponents)/Loading/Loading";
import { getTokenFunction } from "@/app/utilities/getTokenFunction";
import SampleTextPromptComp from "@/app/Components/(liteComponents)/SampleTextPromptComp/SampleTextPromptComp";
import LoadingCircle from "@/app/Components/(liteComponents)/LoadingCircle/LoadingCircle";

const Page = ({ params }) => {
  const router = useRouter();
  const { promptType, promptid } = params;
  const [promptData, setPromptData] = useState(null); // Initialize with an empty object
  const [status, setstatus] = useState("");

  useEffect(() => {
    const token = getTokenFunction().token;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/getprompt?promptType=${promptType}&id=${promptid}`,
          {
            headers: {
              Authorization: token,
            },
            withCredentials: true,
          }
        );
        setPromptData(response.data[0]);
      } catch (error) {
        console.error("Error fetching prompt data:", error);
      }
    };
    fetchData();
  }, [promptid]);
  if (!promptData) return <LoadingCircle />;

  const updateStatus = async (promptStatus) => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/prompt-status/update?promptType=${promptType}&id=${promptid}`,
      { status: promptStatus },
      {
        headers: {
          Authorization: getTokenFunction().token,
        },
        withCredentials: true,
      }
    );
    router.push("/admin");
  };

  return (
    <div className={styles.parentContainer}>

      {/* left container */}
      <div className={styles.leftContainer}>

        {/* ...................dalle prompt details................. */}
        <div
          className={styles.promptInfo}
          style={{
            display: promptType === "dall-e" ? "flex" : "none"
          }}
        >
          {/* prompt Type */}
          <div>
            <FieldInfo title="Prompt Type" margin="0px" />
            <div className={styles.detail}>{promptData.promptType}</div>
          </div>

          {/* prompt version */}
          <div>
            <FieldInfo title="Prompt Version" margin="0px" />
            <div className={styles.detail}>{promptData.version}</div>
          </div>

          {/* prompt title */}
          <div>
            <FieldInfo title="Prompt Title" margin="0px" />
            <div className={styles.detail}>{promptData.title}</div>
          </div>

          {/* prompt description */}
          <div>
            <FieldInfo title="Prompt Description" margin="0px" />
            <div className={styles.detail}>{promptData.description}</div>
          </div>

          {/* prompt instruction */}
          <div>
            <FieldInfo title="Prompt Instruction" margin="0px" />
            <div className={styles.detail}>{promptData.promptInstruction}</div>
          </div>

          {/* Describe prompt */}
          <div>
            <FieldInfo title="Describe Prompt" margin="0px" />
            <div className={styles.detail}>{promptData.describePrompt}</div>
          </div>

          {/* price */}
          <div>
            <FieldInfo title="Price" margin="0px" />
            <div className={styles.detail}>{promptData.price}</div>
          </div>

          {/* price */}
          <div>
            <FieldInfo title="Status" margin="0px" />
            <div className={styles.detail}>{promptData.status}</div>
          </div>

          {/* userId */}
          <div>
            <FieldInfo title="userId" margin="0px" />
            <div className={styles.detail}>{promptData.userId}</div>
          </div>
        </div>


        {/* ...................Midjourney prompt details................. */}


        <div
          className={styles.promptInfo}
          style={{
            display: promptType === "midjourney" ? "flex" : "none"
          }}
        >
          {/* prompt Type */}
          <div>
            <FieldInfo title="Prompt Type" margin="0px" />
            <div className={styles.detail}>{promptData.promptType}</div>
          </div>

          {/* prompt title */}
          <div>
            <FieldInfo title="Prompt Title" margin="0px" />
            <div className={styles.detail}>{promptData.title}</div>
          </div>

          {/* prompt description */}
          <div>
            <FieldInfo title="Prompt Description" margin="0px" />
            <div className={styles.detail}>{promptData.description}</div>
          </div>

          {/* prompt instruction */}
          <div>
            <FieldInfo title="Prompt Instruction" margin="0px" />
            <div className={styles.detail}>{promptData.promptInstructions}</div>
          </div>

          {/* price */}
          <div>
            <FieldInfo title="Price" margin="0px" />
            <div className={styles.detail}>{promptData.price}</div>
          </div>

          {/* price */}
          <div>
            <FieldInfo title="Status" margin="0px" />
            <div className={styles.detail}>{promptData.status}</div>
          </div>

          {/* userId */}
          <div>
            <FieldInfo title="userId" margin="0px" />
            <div className={styles.detail}>{promptData.userId}</div>
          </div>
        </div>



        {/* ...................Gpt prompt details................. */}


        <div
          className={styles.promptInfo}
          style={{
            display: promptType === "gpt" ? "flex" : "none"
          }}
        >
          {/* prompt Type */}
          <div>
            <FieldInfo title="Prompt Type" margin="0px" />
            <div className={styles.detail}>{promptData.promptType}</div>
          </div>

          {/* gpt type */}
          <div>
            <FieldInfo title="GPT Type" margin="0px" />
            <div className={styles.detail}>{promptData.gptType}</div>
          </div>

          {/* gpt version */}
          <div>
            <FieldInfo title="GPT Version" margin="0px" />
            <div className={styles.detail}>{promptData.gptPromptType}</div>
          </div>

          {/* prompt Title */}
          <div>
            <FieldInfo title="Prompt Title" margin="0px" />
            <div className={styles.detail}>{promptData.title}</div>
          </div>

          {/* prompt description */}
          <div>
            <FieldInfo title="Prompt Description" margin="0px" />
            <div className={styles.detail}>{promptData.description}</div>
          </div>

          {/* prompt instructions */}
          <div>
            <FieldInfo title="Prompt Instruction" margin="0px" />
            <div className={styles.detail}>{promptData.promptInstructions}</div>
          </div>

          {/* price */}
          <div>
            <FieldInfo title="Price" margin="0px" />
            <div className={styles.detail}>{promptData.price}</div>
          </div>

          {/* status */}
          <div>
            <FieldInfo title="Status" margin="0px" />
            <div className={styles.detail}>{promptData.status}</div>
          </div>

          {/* userId */}
          <div>
            <FieldInfo title="userId" margin="0px" />
            <div className={styles.detail}>{promptData.userId}</div>
          </div>
        </div>

        {/*.................. buttons ........................*/}
        <div className={styles.btnContainer}>
          <GradientButton title="Approve" onClick={() => updateStatus('active')} />
          <GradientButton title="Reject" onClick={() => updateStatus('paused')} />
        </div>
      </div>

      {/* right container */}
      <div
        className={styles.rightContainer}
        style={{
          padding: promptData.promptType === "Dall-E" || promptData.promptType === "Midjourney" ? '20px' : '0px'
        }}
      >
        <SampleTextPromptComp maxHeight={'max-content'} promptType={(promptData.promptType).toLowerCase()} samplePromptsArr={promptData.examplePrompts} />
        {promptData?.Image_Url?.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
