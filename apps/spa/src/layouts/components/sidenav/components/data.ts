import type { MenuItemType } from "@/types/layout";

export const menuItems: MenuItemType[] = [
  {
    key: "overview-title",
    label: "Overview",
    isTitle: true
  },
  {
    key: "dashboards",
    label: "Dashboards",
    icon: "lucide:monitor-dot",
    children: [
      { key: "hr", label: "Home", url: "/dashboard/hr" }
    ]
  },
  {
    key: "apps-title",
    label: "Apps",
    isTitle: true
  },
  {
    key: "extension",
    label: "Extension",
    icon: "lucide:picture-in-picture-2",
    children: [
      { key: "hr", label: "Home", url: "/dashboard/hr" },
      { key: "dom-selector", label: "DOM Selector", url: "#" },
      { key: "locale", label: "Locale", url: "#" },
      { key: "logs", label: "Logs", url: "#" }
    ]
  },
  {
    key: "apps-title",
    label: "Account",
    isTitle: true
  },
  {
    key: "payment",
    label: "Payment Integration",
    icon: "lucide:messages-square",
    url: "/apps/chat"
  },{
    key: "digitalocean",
    label: "Digital Ocean",
    icon: "lucide:messages-square",
    url: "/apps/chat"
  },{
    key: "settings",
    label: "Settings",
    icon: "lucide:messages-square",
    url: "/apps/chat"
  }
];
