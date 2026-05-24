"use client";

import { motion } from "framer-motion";
import { useNavbar } from "@/hooks/useNavbar";
import NavBrand from "./navbar/NavBrand";
import DesktopNav from "./navbar/DesktopNav";
import DesktopActions from "./navbar/DesktopActions";
import MobileActions from "./navbar/MobileActions";
import MobileDrawer from "./navbar/MobileDrawer";
import SearchBar from "./navbar/SearchBar";
import NavbarStyles from "./navbar/NavbarStyles";

export default function Navbar() {
  const state = useNavbar();

  return (
    <>
      <motion.nav
        initial={false}
        animate={
          state.scrolled
            ? {
                backgroundColor: "var(--glass-bg)",
                backdropFilter: "blur(18px) saturate(180%)",
                boxShadow: "0 1px 0 rgba(255,77,157,0.15), 0 8px 32px rgba(0,0,0,0.15)",
              }
            : {
                backgroundColor: "rgba(0,0,0,0)",
                backdropFilter: "blur(0px)",
                boxShadow: "none",
              }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 right-0 left-0 z-50 w-full"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <NavBrand />
            <DesktopNav
              browseOpen={state.browseOpen}
              setBrowseOpen={state.setBrowseOpen}
              browseRef={state.browseRef}
              isDark={state.isDark}
            />
            <DesktopActions
              mounted={state.mounted}
              isDark={state.isDark}
              toggleTheme={state.toggleTheme}
              searchOpen={state.searchOpen}
              setSearchOpen={state.setSearchOpen}
              searchQuery={state.searchQuery}
              setSearchQuery={state.setSearchQuery}
              searchRef={state.searchRef}
            />
            <MobileActions
              mounted={state.mounted}
              isDark={state.isDark}
              toggleTheme={state.toggleTheme}
              setSearchOpen={state.setSearchOpen}
              mobileOpen={state.mobileOpen}
              setMobileOpen={state.setMobileOpen}
            />
          </div>
          <SearchBar
            searchOpen={state.searchOpen}
            setSearchOpen={state.setSearchOpen}
            searchQuery={state.searchQuery}
            setSearchQuery={state.setSearchQuery}
            searchRef={state.searchRef}
          />
        </div>
      </motion.nav>

      <MobileDrawer
        mobileOpen={state.mobileOpen}
        setMobileOpen={state.setMobileOpen}
        mobileBrowseOpen={state.mobileBrowseOpen}
        setMobileBrowseOpen={state.setMobileBrowseOpen}
      />

      <NavbarStyles />
    </>
  );
}