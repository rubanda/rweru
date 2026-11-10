export type Group = "have" | "now" | "later" | "if";
export type Filter = "all" | Group;

export type DashboardStep = {
  title: string;
  detail?: string;
};

export type DashboardItem = {
  id: string;
  name: string;
  group: Group;
  status: string;
  deadline: string;
  cost: string;
  route: string;
  where: string;
  what: string;
  docs: string[];
  steps: DashboardStep[];
  time: string;
  contact: string;
};

export type PortalLink = {
  title: string;
  site: string;
  href: string;
};

export type DashboardData = {
  title: string;
  summary: string;
  asOf: string;
  items: DashboardItem[];
  sources: string[];
  portals: PortalLink[];
  noteLead: string;
  noteBody: string;
};

export const GROUP_LABEL: Record<Group, string> = {
  have: "Have",
  now: "Get now",
  later: "Later",
  if: "Only if needed",
};

export const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "have", label: "Have" },
  { value: "now", label: "Get now" },
  { value: "later", label: "Later" },
  { value: "if", label: "Only if needed" },
];
