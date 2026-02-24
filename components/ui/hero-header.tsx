'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icons } from '@/components/icons'

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export function HeroHeader({ profile }: { profile: any }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="border-b border-foreground/10 pb-8 font-mono text-[10px] uppercase tracking-widest font-black"
    >
      {/* Using justify-between and w-full ensures that the remaining items 
          fill up the space and look intentional.
      */}
      <div className="flex flex-wrap items-center justify-between gap-y-8 w-full">
        
        {/* Location */}
        <div className="space-y-2">
          <span className="opacity-30 block text-[8px] tracking-[0.3em]">Location</span>
          <div className="flex items-center gap-2 h-4">
            {Icons.location && <Icons.location size={12} className="text-primary shrink-0" />}
            <span className="leading-none">{profile?.location || "Bogo City, PH"}</span>
          </div>
        </div>

        {/* Socials */}
        <div className="space-y-2">
          <span className="opacity-30 block text-[8px] tracking-[0.3em]">Socials</span>
          <div className="flex gap-4 items-center h-4">
            {profile?.linkedin_url && Icons.linkedin && (
              <Link href={profile.linkedin_url} target="_blank" className="hover:text-primary transition-all hover:-translate-y-0.5">
                <Icons.linkedin size={16} />
              </Link>
            )}
            {profile?.behance_url && Icons.behance && (
              <Link href={profile.behance_url} target="_blank" className="hover:text-primary transition-all hover:-translate-y-0.5">
                <Icons.behance size={16} />
              </Link>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <span className="opacity-30 block text-[8px] tracking-[0.3em]">Status</span>
          <div className="flex items-center gap-2 h-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            <span className="leading-none">{profile?.availability_status || "Open for Work"}</span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}