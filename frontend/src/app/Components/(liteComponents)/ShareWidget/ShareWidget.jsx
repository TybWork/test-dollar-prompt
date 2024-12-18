import React from 'react'
import styles from '@/app/Components/(liteComponents)/ShareWidget/ShareWidget.module.css'
import { RedditShareButton, TwitterShareButton, LinkedinShareButton, FacebookShareButton } from 'react-share'
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaReddit } from "react-icons/fa";
import CopyComponent from '../CopyComponent/CopyComponent';
import { RxCross2 } from "react-icons/rx";

const ShareWidget = ({ title, url, crossFunc, height, borderRadius, justifyContent, isCross = false }) => {
    return (
        <div
            className={styles.widgetContainer}
            style={{
                height: height,
                borderRadius: borderRadius,
                justifyContent: justifyContent,
            }}
        >
            <RxCross2 style={{ display: isCross ? 'block' : 'none' }} onClick={crossFunc} className={styles.crossIcon} />

            <div className={styles.title}>{title || 'Share to'}</div>
            <div className={styles.iconContainer}>

                <RedditShareButton url={url || '#'}>
                    <FaReddit className={styles.redditIcon} />
                </RedditShareButton>

                <LinkedinShareButton url={url || '#'}>
                    <FaLinkedin className={styles.linkedinIcon} />
                </LinkedinShareButton>

                <TwitterShareButton url={url || '#'}>
                    <FaXTwitter className={styles.twitterIcon} />
                </TwitterShareButton>

                <FacebookShareButton url={url || '#'}>
                    <FaFacebook className={styles.facebookIcon} />
                </FacebookShareButton>

            </div>

            <div className={styles.copyBtn}>
                <CopyComponent url={url} />
            </div>
        </div>
    )
}
export default ShareWidget