import Image from "next/image";
import styles from "@/app/Components/reviewCard/ReviewCard.module.css";
import GradientButton from "../GradientButton/GradientButton";
import Link from "next/link";
import { MdTextSnippet } from "react-icons/md";
const ReviewCard = ({
  label,
  description,
  image,
  promptType = "Dall-E",
  onClick,
  href,
}) => {
  return (
    <div className={styles.featuredCardContainer}>
      {promptType === "Dall-E" || promptType === "Midjourney" ? (
        <Image
          className={styles.image}
          alt="demo_image"
          src={image}
          width={350}
          height={200}
        />
      ) : (
        <div className={styles.iconBg}>
          <MdTextSnippet />
        </div>
      )}
      <div className={styles.label}>{label}</div>
      <div className={styles.optionsContainer}>
        <div className={styles.infoText}>{description}</div>
        <div className={styles.reviewBtn}>
          <Link href={href || "/"}>
            <GradientButton title="Review" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;
