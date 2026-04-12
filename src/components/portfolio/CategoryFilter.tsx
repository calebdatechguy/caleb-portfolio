import { motion } from 'framer-motion'
import { categoryLabels as defaultLabels, type ProjectCategory } from '@/data/portfolio'

const ALL = 'all'
type FilterValue = ProjectCategory | typeof ALL

interface CategoryFilterProps {
  active: FilterValue
  onChange: (cat: FilterValue) => void
  counts: Record<string, number>
  categoryLabels?: Record<string, string>
}

export function CategoryFilter({ active, onChange, counts, categoryLabels = defaultLabels }: CategoryFilterProps) {
  const tabs: { value: FilterValue; label: string }[] = [
    { value: ALL, label: 'All Work' },
    ...Object.entries(categoryLabels).map(([value, label]) => ({
      value: value as ProjectCategory,
      label,
    })),
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = active === tab.value
        const count = tab.value === ALL ? counts[ALL] : counts[tab.value]
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`relative px-4 py-2 text-[0.6rem] font-700 tracking-[0.2em] uppercase transition-all duration-200 ${
              isActive
                ? 'text-white bg-blue'
                : 'text-muted-foreground border border-border hover:border-blue/50 hover:text-foreground'
            }`}
            style={{ fontWeight: 700 }}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 bg-blue -z-10"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
            {tab.label}
            {count !== undefined && (
              <span className={`ml-1.5 text-[0.55rem] ${isActive ? 'text-white/60' : 'text-muted-foreground/50'}`}>
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
