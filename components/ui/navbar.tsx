"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const mainNavItems = [
  { name: "Profile", href: "/", icon: Icons.about },
  { name: "Projects", href: "/projects", icon: Icons.Stack },
  { name: "Contact", href: "/contact", icon: Icons.Mail },
]

const projectCategories = [
  { name: "Brand Identity", href: "/projects/branding" },
  { name: "Creative / Experimental", href: "/projects/creative" },
  { name: "Marketing & Ads", href: "/projects/marketing" },
  { name: "UI/UX", href: "/projects/ux" },
  { name: "Web Development", href: "/projects/dev" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isProjectsOpen, setIsProjectsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleClose = () => setIsProjectsOpen(false)
    if (isProjectsOpen) window.addEventListener('click', handleClose)
    return () => window.removeEventListener('click', handleClose)
  }, [isProjectsOpen])

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center">
      
      {/* Up-Menu */}
      <AnimatePresence>
        {isProjectsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="mb-1 border border-foreground bg-background shadow-[3px_3px_0px_0px_var(--foreground)] min-w-[220px]"
          >
            <div className="bg-foreground/[0.03] border-b border-foreground px-4 py-2">
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] opacity-50">
                Expertise
              </span>
            </div>

            <div className="flex flex-col font-sans py-1">
              {projectCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setIsProjectsOpen(false)}
                  className="px-4 py-2 text-[12px] font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all flex justify-between items-center group"
                >
                  {cat.name}
                  <Icons.Arrow size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dock */}
      <nav 
        onClick={(e) => e.stopPropagation()}
        className="flex h-12 items-stretch border border-foreground bg-background shadow-[4px_4px_0px_0px_var(--foreground)]"
      >
        <div className="flex items-stretch font-mono">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Projects" && pathname.includes("/projects"))
            const Icon = item.icon

            if (item.name === "Projects") {
              return (
                <button
                  key={item.name}
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 md:px-6 text-[10px] font-bold uppercase tracking-[0.2em] border-r border-foreground transition-all",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary/5"
                  )}
                >
                  <Icon size={14} className="shrink-0" />
                  <span className="hidden md:block">{item.name}</span>
                  <motion.div 
                    animate={{ rotate: isProjectsOpen ? 0 : 180 }}
                    className="opacity-60 hidden md:block"
                  >
                    <Icons.Chevron size={12} />
                  </motion.div>
                </button>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-4 md:px-6 text-[10px] font-bold uppercase tracking-[0.2em] border-r border-foreground transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/5"
                )}
              >
                <Icon size={14} className="shrink-0" />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Square Toggle Box */}
        <div className="flex items-center justify-center w-12 border-l border-foreground bg-foreground/[0.03]">
          <ModeToggle />
        </div>
      </nav>
    </div>
  )
}