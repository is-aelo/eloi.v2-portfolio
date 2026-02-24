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

const buildLetterVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -30 : 30,
    y: i % 3 === 0 ? -20 : 20,
    rotate: i % 2 === 0 ? -10 : 10,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 }
  }
}

const togetherLeftVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.6 } }
}

const togetherRightVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 15, stiffness: 100, delay: 0.6 } }
}

export function FooterCTA({ email }: { email: string }) {
  return (
    <motion.section 
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-32 md:py-48 border-t border-foreground/10 flex flex-col items-center text-center space-y-16"
    >
      <div className="space-y-10 w-full px-4">
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-primary block">
          Collaborate
        </span>
        
        <div className="text-[clamp(3rem,14vw,8.5rem)] font-black uppercase tracking-tighter leading-[0.8] cursor-default select-none">
          <div className="flex flex-col md:flex-row justify-center items-center md:gap-x-[0.3em] mb-2 md:mb-4">
            <span className="font-black">let's</span>
            <div className="flex">
              {"build".split("").map((char, i) => (
                <motion.span 
                  key={i} 
                  custom={i} 
                  variants={buildLetterVariants} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center pt-2 md:pt-4">
            <motion.span 
              variants={togetherLeftVariants} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-serif italic font-normal text-primary lowercase"
            >
              toge
            </motion.span>
            <motion.span 
              variants={togetherRightVariants} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-serif italic font-normal text-primary lowercase"
            >
              ther.
            </motion.span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 w-full px-6">
        <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="w-full max-w-sm">
          <Link 
            href={`mailto:${email}`}
            className="flex items-center justify-center gap-4 px-8 py-5 md:px-12 md:py-6 bg-foreground text-background font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all group shadow-xl"
          >
            {Icons.email ? <Icons.email size={18} className="group-hover:rotate-12 transition-transform shrink-0" /> : "✉"}
            <span>Get in touch</span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}