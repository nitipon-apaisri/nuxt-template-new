export interface MenuItem {
  label: string;
  icon: string;
  to?: string;
  value?: string;
  children?: MenuItem[];
}
