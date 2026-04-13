import { useState, useEffect } from 'react'
import { useSearch } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePageTitle } from '@/lib/usePageTitle'

interface FormData {
  name: string
  email: string
  service: string
  date: string
  budget: string
  message: string
}

const initialForm: FormData = {
  name: '',
  email: '',
  service: '',
  date: '',
  budget: '',
  message: '',
}

const serviceOptions = [
  { value: 'wedding-film', label: 'Wedding Film' },
  { value: 'wedding-photo', label: 'Wedding Photography' },
  { value: 'commercial-video', label: 'Commercial / Brand Video' },
  { value: 'brand-photo', label: 'Brand Photography' },
  { value: 'web-design', label: 'Web Design & Development' },
  { value: 'brand-identity', label: 'Brand & Logo Design' },
  { value: 'other', label: 'Other / Not Sure' },
]

const budgetOptions = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1500', label: '$500 – $1,500' },
  { value: '1500-5000', label: '$1,500 – $5,000' },
  { value: '5000+', label: '$5,000+' },
]

export function ContactPage() {
  usePageTitle('Contact', 'Start a project with Caleb Elliott — wedding films, photography, web design, and brand identity. Based in Georgia, available nationwide.')
  const searchParams = useSearch({ strict: false }) as { service?: string }
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Pre-select service from ?service= URL param
  useEffect(() => {
    if (searchParams?.service) {
      const serviceMap: Record<string, string> = {
        film: 'wedding-film',
        photo: 'wedding-photo',
        web: 'web-design',
        brand: 'brand-identity',
      }
      const mapped = serviceMap[searchParams.service] || searchParams.service
      const valid = serviceOptions.find((o) => o.value === mapped)
      if (valid) setForm((prev) => ({ ...prev, service: valid.value }))
    }
  }, [searchParams?.service])

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.message.trim()) newErrors.message = 'Tell me about your project'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
    } catch {
      setErrors((prev) => ({ ...prev, message: 'Something went wrong — please try again or email me directly.' }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
              className="w-20 h-20 bg-blue flex items-center justify-center"
            >
              <CheckCircle className="w-9 h-9 text-white" />
            </motion.div>
            <div>
              <h2
                className="font-sans text-foreground leading-none mb-4"
                style={{ fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
              >
                MESSAGE SENT.
              </h2>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                Thanks for reaching out, {form.name.split(' ')[0]}. I'll get back to you within 24–48 hours.
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm(initialForm) }}
              className="label-tag text-muted-foreground hover:text-foreground transition-colors border-b border-muted-foreground/30 pb-0.5"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 min-h-screen"
          >
            {/* Left panel — full-height image */}
            <div className="hidden lg:block relative">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
                alt="Contact"
                className="w-full h-full object-cover sticky top-0"
                style={{ filter: 'brightness(0.35) saturate(0.5)', maxHeight: '100vh', position: 'sticky', top: 0 }}
              />
              <div className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(8,12,40,0.7) 0%, rgba(15,30,100,0.4) 100%)'
                }}
              />
              <div className="absolute bottom-12 left-10 right-10">
                <p className="label-tag text-blue mb-4">Contact</p>
                <h2
                  className="font-sans text-white leading-none"
                  style={{ fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em' }}
                >
                  LET'S CREATE<br />SOMETHING<br />TOGETHER.
                </h2>
                <p className="text-white/40 text-sm mt-4">Georgia, USA · caleb@lykodigital.com</p>
              </div>
              {/* Blue left accent */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-blue/20" />
            </div>

            {/* Right panel — form */}
            <div className="pt-32 pb-16 px-6 md:px-12 lg:px-16 flex flex-col justify-center">
              {/* Mobile header */}
              <div className="lg:hidden mb-10">
                <p className="label-tag text-blue mb-4">Contact</p>
                <h1
                  className="font-sans text-foreground leading-none mb-2"
                  style={{ fontWeight: 900, fontSize: 'clamp(2rem, 6vw, 3.5rem)', letterSpacing: '-0.03em' }}
                >
                  LET'S CREATE<br />SOMETHING.
                </h1>
                <p className="text-muted-foreground text-sm">Tell me about your project — I'll reply in 24–48 hours.</p>
              </div>

              {/* Desktop sub-header */}
              <div className="hidden lg:block mb-10">
                <p className="label-tag text-blue mb-3">Get in Touch</p>
                <p className="text-muted-foreground text-sm">Tell me about your project — I'll reply in 24–48 hours.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-7 max-w-lg">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="label-tag text-muted-foreground">
                      Name <span className="text-blue">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your name"
                      className={`bg-card border-border focus:border-blue ${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="label-tag text-muted-foreground">
                      Email <span className="text-blue">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className={`bg-card border-border focus:border-blue ${errors.email ? 'border-destructive' : ''}`}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label className="label-tag text-muted-foreground">Service Interested In</Label>
                  <Select value={form.service} onValueChange={(v) => handleChange('service', v)}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Select a service…" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="label-tag text-muted-foreground">
                      Event / Project Date <span className="text-muted-foreground/40">(optional)</span>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="label-tag text-muted-foreground">
                      Budget <span className="text-muted-foreground/40">(optional)</span>
                    </Label>
                    <Select value={form.budget} onValueChange={(v) => handleChange('budget', v)}>
                      <SelectTrigger className="bg-card border-border">
                        <SelectValue placeholder="Select a range…" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="label-tag text-muted-foreground">
                    Tell Me About Your Project <span className="text-blue">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="What are you working on? Where is it? When? What do you have in mind?"
                    rows={5}
                    className={`bg-card border-border focus:border-blue resize-none ${errors.message ? 'border-destructive' : ''}`}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-blue text-white text-[0.65rem] font-800 tracking-[0.25em] uppercase hover:bg-blue-bright transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontWeight: 800 }}
                >
                  {submitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
