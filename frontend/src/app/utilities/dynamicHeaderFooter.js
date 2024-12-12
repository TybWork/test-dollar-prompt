"use client"

import { usePathname } from "next/navigation";
import AdminHeader from "../Components/AdminHeader/AdminHeader";
import NewFooter from "../Components/(updatedDesignComp)/NewFooter/NewFooter";
import GuestHeader from "../Components/(updatedDesignComp)/GuestHeader/GuestHeader";
import BuyerHeader from "../Components/(Headers)/BuyerHeader/BuyerHeader";
import { useEffect, useState } from "react";
import { userData } from "./userData";

export const DynamicHeader = () => {
    const data = userData()
    const pathname = usePathname()

    // Start the timeout only if the user is NOT on the login or signup page
    useEffect(() => {
        if (pathname === '/login' || pathname === '/signup') {
            return;
        } else {
            setTimeout(() => {
                localStorage.removeItem('redirectTo');
            }, 3000);
        }
    }, [pathname]);

    const renderHeader = () => {
        if (typeof window !== 'undefined') {

            if (pathname.includes('/admin')) {
                return <AdminHeader />
            }
            else if (pathname.includes('/master-dashboard')) {
                return null
            }
            else if (data.userRole == 'user') {
                return <BuyerHeader />
            }
            else if (data.userRole == 'seller') {
                return <BuyerHeader />
            }
            else {
                if (data.userRole == 'admin') {
                    return <AdminHeader />
                } else {
                    // return <Header />
                    return <GuestHeader />
                    // return <BuyerHeader />
                }
            }
        }
        return <GuestHeader />

    }

    const renderFooter = () => {
        if (typeof window !== 'undefined') {
            if (pathname.includes('/master-dashboard')) {
                return null
            }
            else {
                return <NewFooter />
            }
        }
    }

    return { renderHeader, renderFooter }
}