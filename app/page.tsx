'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Icons } from '@/components/icons' // Isang import na lang!

export default function Home() {
  const [projects, setProjects] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })
        
        const { data: profileData } = await supabase
          .from('profile')
          .select('*')
          .limit(1)
          .single()

        if (projectsData) setProjects(projectsData)
        if (profileData) setProfile(profileData)
      } catch (error) {
        console.error("Connection Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-background bg-background text-foreground">
      <nav className="flex justify-between items-center px-8 py-6 border-b border-foreground/10">
        <span className="text-xl font-black uppercase tracking-tighter">
          Eloi<span className="text-primary">.</span>
        </span>
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] items-center">
          <a href="#works" className="hover:text-primary transition-colors hidden md:block">Works</a>
          <a 
            href={`mailto:${profile?.email || ''}`} 
            className="bg-foreground text-background px-5 py-2.5 rounded-full hover:bg-primary transition-all flex items-center gap-2"
          >
            <Icons.Mail size={14} />
            <span>Contact</span>
          </a>
        </div>
      </nav>

      <main>
        <section className="px-8 py-24 md:py-40 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
              BSIT Graduate • {profile?.availability_status || 'Open for Work'}
            </span>
          </div>
          
          <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase mb-12">
            Visuals <span className="text-primary italic font-serif lowercase tracking-normal font-light">&</span> <br />
            Interfaces
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-foreground/10 pt-12">
            <div className="max-w-xl">
              <p className="text-xl md:text-2xl font-bold leading-tight italic flex items-center gap-3 mb-4">
                <Icons.Location size={20} className="text-primary" />
                Based in {profile?.location || 'Bogo City, PH'}
              </p>
              <p className="opacity-60 text-lg">Building digital experiences with a retro heart and a modern mind.</p>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase opacity-40 mb-2 flex items-center gap-2">
                  <Icons.Stack size={12} /> Main Stack
                </span>
                <span className="font-mono text-sm font-bold tracking-tighter text-primary">
                  Next.js, Figma, Adobe Suite
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="px-8 pb-32 max-w-7xl mx-auto border-t border-foreground/5 pt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Selected Works</h2>
            <Icons.Projects size={20} className="opacity-20" />
          </div>
          
          {loading ? (
            <div className="flex items-center gap-3 font-mono text-xs opacity-50 italic uppercase tracking-widest py-20">
              <Icons.Loading className="animate-spin" size={16} />
              Fetching Portfolio...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {projects.map((project) => (
                <div key={project.id} className="group cursor-pointer">
                  <div className="aspect-[16/10] bg-accent/20 border border-foreground/10 rounded-2xl overflow-hidden relative mb-8 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/5">
                    {project.is_featured && (
                      <div className="absolute top-6 left-6 z-10 bg-primary text-background text-[9px] font-black px-3 py-1.5 uppercase tracking-widest rounded-full shadow-lg">
                        Featured Work
                      </div>
                    )}
                    
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-foreground/5 font-black text-8xl uppercase italic tracking-tighter group-hover:text-primary/10 transition-colors">
                        {project.title.split(' ')[0]}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex gap-4 mt-3">
                        <span className="text-[11px] font-mono font-bold opacity-40 uppercase tracking-[0.2em]">
                          {project.category}
                        </span>
                        <span className="text-[11px] font-mono font-bold opacity-20 uppercase tracking-[0.2em]">/</span>
                        <span className="text-[11px] font-mono font-bold opacity-40 uppercase tracking-[0.2em]">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <Icons.Arrow className="group-hover:text-background transition-colors" size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="px-8 py-16 border-t border-foreground/10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-black uppercase tracking-tighter">Eloi<span className="text-primary">.</span></span>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">© 2026 Crafted in Bogo City</p>
        </div>
        
        <div className="flex gap-10">
          {profile?.behance_url && (
            <a href={profile.behance_url} target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-primary transition-all">
              <Icons.External size={12} /> Behance
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-primary transition-all">
              <Icons.LinkedIn size={12} /> LinkedIn
            </a>
          )}
        </div>
      </footer>
    </div>
  )
}