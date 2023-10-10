// icon

import { MdBarChart } from "react-icons/md";

import { FaUser, FaBook } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { globalStyles } from "../theme/styles";

export const DashboardStatistics = [
    {
        id: 1,
        icon: "/Icon.png",
        name: "総契約数（法人）",
        value: `12345678`,
        label: "契約",
        path: "/suppliers"
    },
    {
        id: 2,
        icon: "dolar.png",
        name: "新規契約数（法人）",
        value: `12345`,
        label: "契約",
        path: "/suppliers"
    },
    {
        id: 3,
        // icon: ImPriceTag,
        name: "解約数（法人）",
        value: `1234`,
        path: "/project"
    },
    {
        id: 4,
        icon: "Icon.png",
        name: "総契約数（個人）",
        value: `12345678`,
        label: "契約",
        path: "/users"
    },
    {
        id: 5,
        icon: "dolar.png",
        name: "新規契約数（個人）",
        value: `12345`,
        label: "契約",
        path: "/suppliers"
    },
    {
        id: 6,
        // icon: FaUser,
        name: "解約数（個人）",
        value: `1234`,
        path: "/project"
    }
];

export const getDashboardData = (contract: any, user: any) => {
    return [
        {
            id: 1,
            icon: "Icon.png",
            name: "総契約数（法人）",
            value: 100,
            label: "契約",
            path: "/contract"
        },
        {
            id: 2,
            icon: "dolar.png",
            name: "新規契約数（法人）",
            value: 200,
            label: "契約",
            path: "/contract"
        },
        {
            id: 3,
            // icon: ImPriceTag,
            name: "解約数（法人）",
            value: 300,
            path: "/project"
        },
        {
            id: 4,
            icon: "Icon.png",
            name: "総契約数（個人）",
            value: 400,
            label: "契約",
            path: "/users"
        },
        {
            id: 5,
            icon: "dolar.png",
            name: "新規契約数（個人）",
            value: 500,
            label: "契約",
            path: "/suppliers"
        }
        // {
        //     id: 6,
        //     // icon: FaUser,
        //     name: "解約数（個人）",
        //     value: user?.userCountForVerification,
        //     path: "/project"
        // }
    ];
};

export const AdminManagmentDetails = [
    {
        id: "123456789987654321123456",
        name: "chetan",
        email: "chetan.softcolon@gmail.com",
        status: "通報あり"
    },
    {
        id: "123456789987654321123456",
        name: "Kaushik",
        email: "tejanikaushik@gmail.com",
        status: "対応中"
    }
];

export const barChartDataDailyTraffic = [
    {
        name: "Daily Traffic",
        data: [20, 30, 40, 20, 45, 50, 3]
    }
];

export const barChartDataConsumption = [
    {
        name: "PRODUCT A",
        data: [200, 370, 3030, 390, 3200, 350, 360]
    },
    {
        name: "PRODUCT B",
        data: [4000, 3700, 330, 390, 320, 350, 360]
    },
    {
        name: "PRODUCT C",
        data: [400, 370, 330, 390, 320, 350, 360]
    }
];

const today = new Date();
const first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
const second = first + 1;
const third = first + 2;
const fourth = first + 3;
const fifth = first + 4;
const sixth = first + 5;
const seven = first + 6;

export const barChartOptionsConsumption: any = {
    chart: {
        stacked: true,
        toolbar: {
            show: false
        }
    },
    tooltip: {
        style: {
            fontSize: "12px",
            fontFamily: undefined
        },
        onDatasetHover: {
            style: {
                fontSize: "12px",
                fontFamily: undefined
            }
        },
        theme: "dark"
    },
    xaxis: {
        categories: [
            `${new Date(today.setDate(first)).getDate()}日(日)`,
            `${new Date(today.setDate(second)).getDate()}日(月)`,
            `${new Date(today.setDate(third)).getDate()}日(火)`,
            `${new Date(today.setDate(fourth)).getDate()}日(水)`,
            `${new Date(today.setDate(fifth)).getDate()}日(木)`,
            `${new Date(today.setDate(sixth)).getDate()}日(金)`,
            `${new Date(today.setDate(seven)).getDate()}日(土)`
        ],
        // show: true,
        labels: {
            show: true,
            style: {
                colors: "#A3AED0",
                fontSize: "14px",
                fontWeight: "500"
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false,
        color: "black",
        labels: {
            show: false,
            style: {
                colors: "#A3AED0",
                fontSize: "14px",
                fontWeight: "500"
            }
        }
    },

    grid: {
        borderColor: "rgba(163, 174, 208, 0.3)",
        show: true,
        yaxis: {
            lines: {
                show: false,
                opacity: 0.5
            }
        },
        row: {
            opacity: 0.5
        },
        xaxis: {
            lines: {
                show: false
            }
        }
    },
    fill: {
        type: "solid",
        colors: ["#252525", globalStyles.colors.mainColor, "#6AD2FF", "#E1E9F8", "#252525"]
    },
    legend: {
        show: false
    },
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    dataLabels: {
        enabled: false
    },
    plotOptions: {
        bar: {
            // paddingtop: "20px",
            // borderRadius: 20,
            columnWidth: "20px"
        }
    }
};

const date = new Date();

export function addMonths(months: any) {
    date.setMonth(date.getMonth() + months);
    return date.getMonth();
}

export function setMonth(defineMonth: number) {
    let month = new Date(date.getFullYear(), date.getMonth() - defineMonth, 1).getMonth();

    if (month == 12) {
        month = 1;
    } else {
        month = Number(month) + 1;
    }
    return month;
}

export const lineChartOptionsTotalSpent = {
    chart: {
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            top: 13,
            left: 0,
            blur: 10,
            opacity: 0.1,
            color: "#4318FF"
        }
    },
    colors: ["#12ef23", "#faef23"],
    markers: {
        size: 0,
        colors: "white",
        strokeColors: ["#12ew23", "#faef23"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true
    },
    tooltip: {
        theme: "dark"
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: "smooth",
        type: "line"
    },
    xaxis: {
        type: "numeric",
        categories: [
            `${setMonth(5)}月`,
            `${setMonth(4)}月`,
            `${setMonth(3)}月`,
            `${setMonth(2)}月`,
            `${setMonth(1)}月`,
            `${setMonth(0)}月`,
            `${addMonths(-1)}月`
        ],
        labels: {
            style: {
                colors: "#A3AED0",
                fontSize: "12px",
                fontWeight: "500"
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        offsetX: 0
    },
    yaxis: {
        show: false
    },
    legend: {
        show: false
    },
    grid: {
        show: false,
        column: {
            color: ["#7551FF", "#39B8FF"],
            opacity: 0.5
        }
    }
    // color: [globalStyles.colors.chart.purple, globalStyles.colors.chart.cyan]
};

export const lineChartDataTotalSpent = [
    {
        name: "Revenue",
        data: [50, 64, 48, 66, 49, 68]
    },
    {
        name: "Profit",
        data: [30, 40, 24, 46, 20, 46]
    }
];
export const lineChartDataTotalSpent1 = [
    {
        name: "Revenue",
        data: [60, 64, 48, 66, 90, 68]
    },
    {
        name: "Profit",
        data: [30, 40, 24, 46, 70, 56]
    },
    {
        name: "margin",
        data: [10, 15, 4, 6, 28, 9]
    }
];

export const INDUSTRY: any = {
    construction_industry: "建設業",
    manufacturing_industry: "製造業",
    information_and_communication_industry: "情報通信業",
    transportation_industry: "運輸業",
    wholesale_and_retail_industry: "卸売業、小売業",
    finance_and_insurance_industry: "金融業、保険業 ",
    real_estate_business_and_good_leasing_business: "不動産業、物品賃貸業",
    academic_research_professional_and_technical_services: "学術研究、専門・技術サービス業",
    accommodation_business_and_food_service_business: "宿泊業、飲食サービス業 ",
    service_industry: "サービス業",
    others: "その他"
};

export const AdminContractData = [
    {
        name: "Ronak",
        quantity: 2,
        progress: 0.2,
        date: "test",
        info: true
    },
    {
        name: "Mayank",
        quantity: 2,
        progress: 0.2,
        date: "test",
        info: true
    },
    {
        name: "Chetan",
        quantity: 2,
        progress: 0.2,
        date: "test",
        info: true
    },
    {
        name: "Bhavik",
        quantity: 2,
        progress: 0.2,
        date: "test",
        info: true
    },
    {
        name: "Kaushik",
        quantity: 2,
        progress: 0.2,
        date: "test",
        info: true
    }
];

export const AdminContractByIndustryData = [
    {
        name: "Ronak",
        progress: 0.2,
        quantity: 2,
        info: true
    },
    {
        name: "Raj",
        progress: 0.2,
        quantity: 2,
        info: true
    },
    {
        name: "Sahil",
        progress: 0.2,
        quantity: 2,
        info: true
    },
    {
        name: "Harsh",
        progress: 0.2,
        quantity: 2,
        info: true
    },
    {
        name: "Akshay",
        progress: 0.2,
        quantity: 2,
        info: true
    }
];

export const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
export const videoExtensions = [".mp4", ".webm", ".ogg", ".avi", ".mkv", ".mov", ".wmv", ".avchd", ".flv"];
export const docExtensions = [".pdf", ".doc", ".docx", ".odt", ".rtf", ".tex", ".txt", ".wpd"];
