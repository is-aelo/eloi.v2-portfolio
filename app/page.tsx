'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Icons } from '@/components/icons'
import { HeroHeader } from '@/components/ui/hero-header'
import { FooterCTA } from '@/components/ui/footer-cta'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const imageHover = {
  hover: { scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }
}

export default function LandingPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState('')
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: true, hour: '2-digit', minute: '2-digit' 
      }))
    }, 1000)

    const fetchData = async () => {
      const { data: pData } = await supabase.from('projects').select('*').order('is_featured', { ascending: false })
      const { data: profData } = await supabase.from('profile').select('*').limit(1).single()
      if (pData) setProjects(pData)
      if (profData) setProfile(profData)
    }
    fetchData()
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-background p-2 md:p-6 lg:p-8 font-sans transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[1440px] mx-auto bg-background border border-foreground/10 shadow-2xl flex flex-col min-h-[90vh] relative"
      >
        {/* --- STICKY WINDOW HEADER --- */}
        <div className="sticky top-0 z-[100] h-10 border-b border-foreground/10 px-4 flex items-center justify-between bg-background/90 backdrop-blur-md font-mono text-[10px] uppercase tracking-widest font-black">
          <div className="flex gap-1.5 items-center min-w-0 flex-1 mr-4">
            <Link href="/" className="flex gap-1.5 shrink-0 hover:opacity-70 transition-opacity">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-400/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/40" />
            </Link>
            <span className="ml-4 opacity-40 truncate">Eloisa Jane Talingting</span>
          </div>
          <div className="text-primary tabular-nums shrink-0">{currentTime}</div>
        </div>

        {/* --- CONTENT --- */}
        <div className="flex-1 selection:bg-primary selection:text-primary-foreground">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="px-6 md:px-16 lg:px-24 pt-10 md:pt-14 pb-32 space-y-12 md:space-y-16"
          >
            <motion.div variants={itemVariants} className="w-full">
              <HeroHeader profile={profile} />
            </motion.div>

            {/* --- HERO CONTENT --- */}
            <section className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32 pt-4">
              
              <motion.div variants={itemVariants} className="shrink-0 order-1">
                <motion.div 
                  whileHover="hover" 
                  variants={imageHover} 
                  className="w-[260px] md:w-[340px] lg:w-[400px] bg-background border border-foreground/10 p-1 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.02)] relative group"
                >
                  <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-primary z-10" />
                  <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-primary z-10" />
                  
                  <div className="aspect-square w-full overflow-hidden bg-foreground/[0.03] border border-foreground/5 relative">
                    <div className="absolute inset-0 bg-primary/[0.03] group-hover:bg-transparent transition-colors duration-500 z-10" />
                    
                    {profile?.hero_image_url ? (
                      <img 
                        src={profile.hero_image_url} 
                        alt="Eloisa Jane" 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] uppercase tracking-[0.4em] opacity-20 italic font-bold">
                        [ img_missing ]
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="max-w-2xl space-y-8 order-2 text-center lg:text-left">
                <div className="space-y-6">
                  <h1 className="text-[clamp(2.3rem,8vw,5.5rem)] font-semibold uppercase tracking-tighter leading-[0.85] text-foreground">
                    Eloisa Jane <br /> Talingting
                  </h1>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-6">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: "3rem" }} 
                      transition={{ duration: 1, delay: 0.5, ease: "circOut" }} 
                      className="h-[1px] bg-primary/40 hidden xs:block" 
                    />
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                      className="font-serif text-2xl md:text-3xl lg:text-5xl text-primary tracking-tight italic"
                    >
                      Designer & Developer
                    </motion.span>
                  </div>
                </div>

                <div className="space-y-10">
                  <p className="text-lg md:text-xl font-light leading-relaxed opacity-70 px-2 lg:px-0">
                    Focused on <span className="text-foreground font-medium underline underline-offset-4 decoration-primary/20">user-centric design</span> that translates complex brand values into clear, visual systems. I build functional solutions that prioritize <span className="text-foreground font-medium underline underline-offset-4 decoration-primary/20">clarity</span> and <span className="text-foreground font-medium underline underline-offset-4 decoration-primary/20">usability</span>.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a 
                      href={profile?.resume_url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 bg-foreground text-background border border-foreground px-8 py-4 rounded-none font-mono text-[11px] uppercase tracking-widest font-black hover:bg-primary hover:border-primary transition-all duration-300 w-full sm:w-auto justify-center"
                    >
                      {Icons.arrowDown && <Icons.arrowDown size={14} className="group-hover:translate-y-1 transition-transform" />}
                      Download Resume
                    </a>
                    <Link 
                      href={`mailto:${profile?.email || 'jane.talingting@gmail.com'}`}
                      className="group flex items-center gap-2 border border-foreground/10 px-8 py-4 rounded-none font-mono text-[11px] uppercase tracking-widest font-black hover:bg-foreground/5 hover:border-foreground/30 transition-all duration-300 w-full sm:w-auto justify-center"
                    >
                      Get in touch
                      {Icons.arrowRight && <Icons.arrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* --- SELECTED WORKS --- */}
            <section className="space-y-12 pt-16">
              <motion.div variants={itemVariants} className="flex items-baseline justify-between border-b border-foreground/10 pb-4">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Selected Projects</h2>
                <Link href="/projects" className="font-mono text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-colors italic flex items-center gap-1 group">
                  View All {Icons.arrowRight && <Icons.arrowRight size={12} className="group-hover:translate-x-1" />}
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12 lg:gap-y-20">
                {projects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <Link href={`/projects/${project.id}`} className="group block space-y-6">
                      <motion.div whileHover="hover" variants={imageHover} className="aspect-[16/10] bg-foreground/[0.03] border border-foreground/10 relative overflow-hidden transition-all hover:border-primary/40 rounded-none">
                        {project.image_url ? <img src={project.image_url} alt={project.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0" /> : <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase opacity-10 italic">{project.title}</div>}
                      </motion.div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary font-black italic">{project.category}</span>
                          <div className="h-[1px] flex-grow bg-foreground/5" />
                          <span className="font-mono text-[9px] opacity-30">{project.year}</span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-serif italic tracking-tight group-hover:text-primary">{project.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            <FooterCTA email={profile?.email} />

            {/* --- BACK TO TOP --- */}
            <motion.div variants={itemVariants} className="flex justify-center pt-20">
              <button 
                onClick={scrollToTop}
                className="group flex flex-col items-center gap-4 font-mono text-[9px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all duration-500"
              >
                <div className="w-px h-16 bg-foreground/10 group-hover:bg-primary transition-colors relative overflow-hidden">
                  <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {Icons.arrowUp && <Icons.arrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />}
                  Back to Top
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="h-8 border-t border-foreground/10 px-4 flex items-center justify-between bg-foreground/[0.04] font-mono text-[9px] uppercase tracking-widest opacity-60 font-black italic">
          <div>Portfolio</div>
          <div className="tabular-nums">© {currentYear}</div>
        </div>
      </motion.div>
    </main>
  )
}