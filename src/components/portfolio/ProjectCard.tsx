import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Play, ArrowRight } from 'lucide-react'
import type { Project } from '@/data/portfolio'

interface ProjectCardProps {
  project: Project
  index: number
  variant?: 'normal' | 'tall'
}

export function ProjectCard({ project, index, variant = 'normal' }: ProjectCardProps) {
  const aspectClass = variant === 'tall' ? 'aspect-[3/4]' : 'aspect-project'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
    >
      <Link
        to={`/portfolio/${project.slug}` as string}
        className={`group block relative overflow-hidden rounded-sm bg-muted ${aspectClass}`}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading={index < 4 ? 'eager' : 'lazy'}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-400" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans block mb-1">
            {project.categoryLabel}
          </span>
          <h3 className="font-display text-lg text-white font-light mb-2 line-clamp-2">{project.title}</h3>
          {project.location && (
            <p className="text-xs text-white/60 mb-3">{project.location}</p>
          )}
          <span className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-white/70">
            View Project <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[10px] tracking-[0.15em] uppercase text-white/80">
            {project.categoryLabel}
          </span>
        </div>

        {project.videoUrl && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
            <Play className="w-3 h-3 text-white fill-white" />
          </div>
        )}
      </Link>
    </motion.div>
  )
}
