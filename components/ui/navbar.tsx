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
  { name: "Projects", href: "/projects", icon: Icons.work },
  { name: "Contact", href: "/contact", icon: Icons.email },
]

const projectCategories = [
  { name: "Brand Identity", href: "/projects/branding" },
  { name: "Creative / Experimental", href: "/projects/creative" },
  { name: "Layout", href: "/projects/layout" },
  { name: "Marketing & Ads", href: "/projects/marketing" },
  { name: "UI/UX", href: "/projects/ux" },
  { name: "Software Development", href: "/projects/dev" },
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
      
      <AnimatePresence>
        {isProjectsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: -4, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="mb-1 border border-foreground bg-background shadow-[2px_2px_0px_0px_var(--foreground)] min-w-[220px] overflow-hidden"
          >
            <div className="bg-primary/5 border-b border-foreground px-4 py-1.5 flex justify-between items-center">
              <span className="font-mono text-[8px] font-black uppercase tracking-[0.3em] text-primary/80">
                Expertise
              </span>
              <div className="flex gap-1 opacity-30">
                <div className="w-1 h-1 rounded-full bg-foreground" />
                <div className="w-1 h-1 rounded-full bg-foreground" />
              </div>
            </div>

            <div className="flex flex-col font-sans py-1">
              {projectCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => setIsProjectsOpen(false)}
                  className="px-4 py-2 text-[12px] font-bold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all flex justify-between items-center group"
                >
                  {cat.name}
                  {Icons.arrowRight && <Icons.arrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav 
        onClick={(e) => e.stopPropagation()}
        className="flex h-11 items-stretch border border-foreground bg-background shadow-[3px_3px_0px_0px_var(--foreground)]"
      >
        <div className="flex items-stretch font-mono">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.name === "Projects" && pathname.includes("/projects"))
            const Icon = item.icon

            const content = (
              <div className="flex items-center gap-3">
                {Icon && <Icon size={14} className={cn("shrink-0", isActive ? "text-primary-foreground" : "text-foreground/70")} />}
                <span className={cn("hidden md:block leading-none", isActive ? "text-primary-foreground" : "text-foreground")}>
                  {item.name}
                </span>
                {item.name === "Projects" && Icons.chevron && (
                  <motion.div 
                    animate={{ rotate: isProjectsOpen ? 0 : 180 }}
                    className={cn("opacity-40 hidden md:block", isActive && "text-primary-foreground opacity-100")}
                  >
                    <Icons.chevron size={12} />
                  </motion.div>
                )}
              </div>
            )

            const linkStyles = cn(
              "flex items-center px-5 md:px-6 text-[10px] font-black uppercase tracking-[0.15em] border-r border-foreground transition-all relative cursor-pointer",
              isActive ? "bg-primary" : "hover:bg-primary/5"
            )

            if (item.name === "Projects") {
              return (
                <button key={item.name} onClick={() => setIsProjectsOpen(!isProjectsOpen)} className={linkStyles}>
                  {content}
                </button>
              )
            }

            return (
              <Link key={item.name} href={item.href} className={linkStyles}>
                {content}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center justify-center w-11 border-foreground bg-foreground/[0.03] hover:bg-primary/5 transition-colors">
          <ModeToggle />
        </div>
      </nav>
    </div>
  )
}