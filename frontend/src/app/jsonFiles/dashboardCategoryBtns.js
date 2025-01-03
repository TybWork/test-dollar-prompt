import { RxDashboard } from "react-icons/rx";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { GrOverview } from "react-icons/gr";
import { RiAiGenerate, RiQuillPenLine } from "react-icons/ri";
import { BsPatchExclamation } from "react-icons/bs";
import { BsPatchCheck } from "react-icons/bs";
import { BsPatchQuestion } from "react-icons/bs";
import { LiaBlogSolid } from "react-icons/lia";
import PeopleView from "../Components/(Dashbords)/PeopleView/PeopleView";
import ChatComponent from "../Components/(Dashbords)/ChatComponent/ChatComponent";
import Analytics from "../Components/(Dashbords)/Analytics/Analytics";
import { getTokenFunction } from "../utilities/getTokenFunction";
import { jwtDecode } from "jwt-decode";
import SellPromptComp from "../Components/(Dashbords)/SellPromptComp/SellPromptComp";
import Tab from "../Components/Tab/Tab";
import PromptsTab from "../Components/(Dashbords)/PromptsTab/PromptsTab";
import UnverifiedPromptsComponent from "../Components/(Dashbords)/(adminComponents)/UnverifiedPromptsComponent/UnverifiedPromptsComponent";
import CreateBlogComponent from "../Components/(Dashbords)/(adminComponents)/CreateBlogComponent/CreateBlogComponent";
import { IoIosHeart } from "react-icons/io";
import { RiQuillPenAiFill } from "react-icons/ri";
import FavouritePrompts from "../Components/(Dashbords)/FavouritePrompts/FavouritePrompts";
import ManageBlogComp from "../Components/(Dashbords)/(adminComponents)/ManageBlogComp/ManageBlogComp";

// let userId;
// if (typeof window !== 'undefined') {
//     const token = getTokenFunction().cookie
//     const decodedToken = jwtDecode(token)
//     userId = decodedToken.userId
// }

export const buttons = {
    superAdmin: [
        // {
        //     id: 0,
        //     icon: <RxDashboard />,
        //     title: 'Dashboard',
        //     component: <PeopleView />
        // },
        // {
        //     id: 1,
        //     icon: <IoChatbubblesOutline />,
        //     title: 'Conversation',
        //     component: <ChatComponent senderIdString={userId} />
        // },
        {
            id: 0,
            icon: <GrAnalytics />,
            title: 'Analytics',
            component: <Analytics />
        },
        {
            id: 1,
            icon: <LiaBlogSolid />,
            title: 'Blogs',
            component: <ManageBlogComp />
        },
        // {
        //     id: 2,
        //     icon: <RiQuillPenLine />,
        //     title: 'Write Blog',
        //     component: <CreateBlogComponent />
        // },
        // {
        //     id: 3,
        //     icon: <HiOutlineCreditCard />,
        //     title: 'Billing',
        //     component: 'This Billing'
        // },
    ],
    admin: [
        // {
        //     id: 0,
        //     icon: <GrAnalytics />,
        //     title: 'Overview',
        //     component: 'Overview Component'
        // },
        {
            id: 1,
            icon: <LiaBlogSolid />,
            title: 'Write Blog',
            component: <CreateBlogComponent />
        },
        {
            id: 2,

            icon: <BsPatchQuestion />,
            title: 'Unverified Prompts',
            component: <UnverifiedPromptsComponent promptStatus={'pending'} />
        },
        {
            id: 3,
            icon: <BsPatchCheck />,
            title: 'Verified Prompts',
            component: <UnverifiedPromptsComponent promptStatus={'active'} />
        },
        {
            id: 4,
            icon: <BsPatchExclamation />,
            title: 'Rejected Prompts',
            component: <UnverifiedPromptsComponent promptStatus={'paused'} />
        },
    ],
    seller: [
        {
            id: 0,
            icon: <GrOverview />,
            title: 'Selling History',
            component: <PromptsTab isSellerComp={true} />
        },
        // {
        //     id: 1,
        //     icon: <GrAnalytics />,
        //     title: 'Analytics',
        //     component: 'analytics component'
        // },
        {
            id: 2,
            icon: <RiAiGenerate />,
            title: 'Create Prompt',
            component: <SellPromptComp />
        },
        // {
        //     id: 3,
        //     icon: <HiOutlineCreditCard />,
        //     title: 'Billing',
        //     component: 'Billing Component'
        // },
    ],
    buyer: [
        {
            id: 0,
            icon: <GrOverview />,
            title: 'Buying History',
            component: <PromptsTab isSellerComp={false} />
        },
        {
            id: 1,
            icon: <IoIosHeart />,
            title: 'Favourites',
            component: <FavouritePrompts />
        }
        // {
        //     id: 1,
        //     icon: <GrOverview />,
        //     title: 'Followings',
        //     component: 'Following component'
        // },

        // {
        //     id: 2,
        //     icon: <GrOverview />,
        //     title: 'Favourites',
        //     component: 'Favourite component'
        // },

        // {
        //     id: 3,
        //     icon: <GrOverview />,
        //     title: 'Chats',
        //     component: 'Chat Component'
        // },
    ]
}