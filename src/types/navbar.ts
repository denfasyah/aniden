export interface DropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
}

export interface NavbarState {
  mounted: boolean;
  scrolled: boolean;
  browseOpen: boolean;
  setBrowseOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  mobileBrowseOpen: boolean;
  setMobileBrowseOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  browseRef: React.RefObject<HTMLDivElement | null>;
  searchRef: React.RefObject<HTMLInputElement | null>;
  isDark: boolean;
  toggleTheme: () => void;
}