import { AiOutlineSetting } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { BsCardImage, BsCash } from "react-icons/bs";
import { FaBuromobelexperte } from "react-icons/fa";
import { MdBlockFlipped, MdOutlineAdminPanelSettings } from "react-icons/md";

export interface INavItem {
    id: number;
    icon?: any;
    path: string;
    label: string;
}

export const NAV_ITEMS: Array<INavItem> = [
    {
        id: 4,
        icon: (color: string) => <Icon as={MdBlockFlipped} w={4} h={4} color={color} />,
        path: "/block-user",
        label: "ブロックユーザー"
    },
    {
        id: 3,
        icon: (color: string) => <Icon as={BsCash} w={4} h={4} color={color} />,
        path: "/cash-request",
        label: "換金依頼"
    },
    {
        id: 5,
        icon: (color: string) => <Icon as={AiOutlineSetting} w={4} h={4} color={color} />,
        path: "/setting",
        label: "設定"
    },
    {
        id: 6,
        icon: (color: string) => <Icon as={BsCardImage} w={4} h={4} color={color} />,
        path: "/media",
        label: "メディア"
    }
];

export const MASTER_ADMIN_NAV_ITEMS: Array<INavItem> = [
    {
        id: 1,
        icon: (color: string) => <Icon as={MdOutlineAdminPanelSettings} w={4} h={4} color={color} />,
        path: "/master-admin/manager",
        label: "manager"
    },
    {
        id: 2,
        icon: (color: string) => <Icon as={FaBuromobelexperte} w={4} h={4} color={color} />,
        path: "/profession",
        label: "Profession"
    }
];

export interface OccupationPages {
    id: number;
    href: string;
    label: string;
}

export const tabs: Array<OccupationPages> = [
    {
        id: 1,
        href: "/tab",
        label: "tab"
    },
    {
        id: 2,
        href: "/group",
        label: "group"
    },
    {
        id: 3,
        href: "/job",
        label: "job"
    }
];
