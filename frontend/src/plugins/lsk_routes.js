import LskPageIndexBiller from "@/components/page/LskPageIndexBiller";
import LskPageIndexCustomer from "@/components/page/LskPageIndexCustomer";
import LskPageIndexInvoice from "@/components/page/LskPageIndexInvoice";

import LskPageShowBiller from "@/components/page/LskPageShowBiller";
import LskPageShowCustomer from "@/components/page/LskPageShowCustomer";
import LskPageShowInvoice from "@/components/page/LskPageShowInvoice";

import LskPageLogin from "@/components/page/LskPageLogin";
import LskPageNotFound from "@/components/page/LskPageNotFound";

export default [
    {
        path: "/",
        name: "index",
    },
    {
        path: "/login",
        name: "login",
        component: LskPageLogin,
    },
    {
        path: "/biller",
        name: "indexBiller",
        component: LskPageIndexBiller,
    },
    {
        path: "/biller/:id",
        name: "showBiller",
        component: LskPageShowBiller,
        props: true,
    },
    {
        path: "/customer",
        name: "indexCustomer",
        component: LskPageIndexCustomer,
    },
    {
        path: "/customer/:id",
        name: "showCustomer",
        component: LskPageShowCustomer,
        props: true,
    },
    {
        path: "/invoice",
        name: "indexInvoice",
        component: LskPageIndexInvoice,
    },
    {
        path: "/invoice/:id",
        name: "showInvoice",
        component: LskPageShowInvoice,
        props: true,
    },
    {
        path: "*",
        component: LskPageNotFound,
    },
];
