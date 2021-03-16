import Callback from "../components/Security/callback";
import Home from "../components/Shared/home"

import HomeProvider from "../pages/provider/home-provider.vue"
import Provider from "../pages/provider/provider.vue"
import AllProviders from "../pages/provider/all-providers.vue"
import SessionRate from "../pages/provider/session-rate.vue"
import AllSessionRates from "../pages/provider/all-session-rates.vue"
import AllCorporations from "../pages/provider/all-corporations.vue"
import AllOtherEarnings from "../pages/provider/all-other-earnings.vue"

import ProcessPayroll from "../pages/process/process-payroll.vue"
import NewBatch from "../pages/process/new-batch.vue"
import AllBatches from "../pages/process/all-batches.vue"
import CurrentBatch from "../pages/process/current-batch.vue"
import ReviewProvider from "../pages/process/review-provider.vue"

import HomeOtherEarning from "../pages/other-earnings/home-other-earning"
import NewDeduction from "../pages/other-earnings/new-deduction.vue"
import AllDeductions from "../pages/other-earnings/all-deductions.vue"
import NewCharge from "../pages/other-earnings/new-charge.vue"
import AllOtherCharges from "../pages/other-earnings/all-other-charges.vue"
export const routes = [
  {
    name: "Home",
    path: "/",
    icon: "home",
    title: "Home",
    component: Home,
    onNavBar: false,
    meta: {
      requiresAuth: false
    },
  },
  {
    name: "Provider Rates",
    path: "/provider-rates",
    icon: "home",
    title: "Provider Rates",
    component: HomeProvider,
    onNavBar: true,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: "New Provider",
        path: "new-provider",
        icon: "home",
        title: "New Provider",
        component: Provider,
        onNavBar: true,
        props: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: "All Providers",
        path: "all-providers",
        icon: "home",
        title: "All Providers",
        component: AllProviders,
        onNavBar: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: "All Session Rates",
        path: "all-session-rates",
        icon: "home",
        title: "All Session Rates",
        component: AllSessionRates,
        onNavBar: false,
        props: true,
        meta: {
          requiresAuth: true
        },        
      },
      {
        name: "New Session Rate",
        path: "new-session-rate",
        icon: "home",
        title: "New Session Rate",
        component: SessionRate,
        onNavBar: false,
        props: true,
        meta: {
          requiresAuth: true
        },        
      },
      {
        name: "All Coporations",
        path: "all-coporations",
        icon: "home",
        title: "All Coporations",
        component: AllCorporations,
        onNavBar: true,
        props: true,
        meta: {
          requiresAuth: true
        }
      },
      {
        name: "All Other Earnings",
        path: "all-other-earnings",
        icon: "home",
        title: "All Other Earnings",
        component: AllOtherEarnings,
        onNavBar: false,
        props: true,
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    name: "Process Payroll",
    path: "/process-payroll",
    icon: "home",
    title: "Process Payroll",
    component: ProcessPayroll,
    onNavBar: true,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: "New batch",
        path: "new-batch",
        icon: "home",
        title: "New batch",
        component: NewBatch,
        onNavBar: true,
        meta: {
          requiresAuth: true
        },
      },
      {
        name: "Current batch",
        path: "current-batch",
        icon: "home",
        title: "Current batch",
        component: CurrentBatch,
        onNavBar: true,
        meta: {
          requiresAuth: true
        },        
      },
      {
        name: "All batches",
        path: "all-batches",
        icon: "home",
        title: "All batches",
        component: AllBatches,
        onNavBar: true,
        meta: {
          requiresAuth: true
        },        
      },
      {
        name: "Review Provider",
        path: "review-provider",
        icon: "home",
        title: "Review Provider",
        component: ReviewProvider,
        onNavBar: false,
        meta: {
          requiresAuth: true
        },        
      },
    ]
  },
  {
    name: "Other Earnings",
    path: "/other-earnings",
    icon: "home",
    title: "Other Earnings",
    component: HomeOtherEarning,
    onNavBar: true,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: "New Scheduled Deduction",
        path: "new-deduction",
        icon: "home",
        title: "New Scheduled Deduction",
        component: NewDeduction,
        onNavBar: true,
        props: true,
        meta: {
          requiresAuth: true
        },
      },
      {
        name: "Edit Scheduled Deduction",
        path: "edit-deduction",
        icon: "home",
        title: "Edit Scheduled Deduction",
        component: NewDeduction,
        onNavBar: true,
        props: true,
        meta: {
          requiresAuth: true
        },
      },
      {
        name: "Scheduled Deductions",
        path: "all-deductions",
        icon: "home",
        title: "Scheduled Deductions",
        component: AllDeductions,
        onNavBar: true,
        meta: {
          requiresAuth: true
        },
      },
      {
        name: "New Other Earning Charge",
        path: "new-charge",
        icon: "home",
        title: "New Other Earning Charge",
        component: NewCharge,
        onNavBar: true,
        props: true,
        meta: {
          requiresAuth: true
        },
      },
      {
        name: "Edit Other Earning Charge",
        path: "edit-charge",
        icon: "home",
        title: "Edit Other Earning Charge",
        component: NewCharge,
        onNavBar: true,
        props: true,
        meta: {
          requiresAuth: true
        },
      },
      {
        name: "Other Earning Charges",
        path: "all-charges",
        icon: "home",
        title: "Other Earning Charges",
        component: AllOtherCharges,
        onNavBar: true,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    name: "Reports",
    path: "/reports",
    icon: "home",
    title: "Reports",
    component: Home,
    onNavBar: true,
    meta: {
      requiresAuth: true
    },
  },
  {
    name: "Callback",
    path: "/callback",
    title: "Callback",
    component: Callback,
    onNavBar: false,
  }
];