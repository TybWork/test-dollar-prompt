import { RxDashboard } from "react-icons/rx";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { GrOverview } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";
import { BsPatchExclamation } from "react-icons/bs";
import { BsPatchCheck } from "react-icons/bs";
import { BsPatchQuestion } from "react-icons/bs";
import PeopleView from "../Components/(Dashbords)/PeopleView/PeopleView";
import ChatComponent from "../Components/(Dashbords)/ChatComponent/ChatComponent";

export const buttons = {
    superAdmin: [
        {
            id: 0,
            icon: <RxDashboard />,
            title: 'Dashboard',
            component: <PeopleView />
        },
        {
            id: 1,
            icon: <IoChatbubblesOutline />,
            title: 'Conversation',
            component: <ChatComponent />
        },
        {
            id: 2,
            icon: <GrAnalytics />,
            title: 'Analytics',
            component: 'This Analytics'
        },
        {
            id: 3,
            icon: <HiOutlineCreditCard />,
            title: 'Billing',
            component: 'This Billing'
        },
    ],
    admin: [
        {
            id: 0,
            icon: <GrAnalytics />,
            title: 'Overview',
            component: 'Overview Component'
        },
        {
            id: 0,
            icon: <BsPatchQuestion />,
            title: 'Unverified Prompts',
            component: 'unverified prompts component'
        },
        {
            id: 0,
            icon: <BsPatchCheck />,
            title: 'Verified Prompts',
            component: 'verified prompts'
        },
        {
            id: 0,
            icon: <BsPatchExclamation />,
            title: 'Rejected Prompts',
            component: 'Rejected Prompts'
        },
    ],
    seller: [
        {
            id: 0,
            icon: <GrOverview />,
            title: 'Prompts overview',
            component: 'prompt detail compoent'
        },
        {
            id: 0,
            icon: <GrAnalytics />,
            title: 'Analytics',
            component: 'analytics component'
        },
        {
            id: 0,
            icon: <HiOutlineCreditCard />,
            title: 'Billing',
            component: 'Billing Component'
        },
        {
            id: 0,
            icon: <RiAiGenerate />,
            title: 'Create Prompt',
            component: 'Create Prompts'
        },
    ]
}