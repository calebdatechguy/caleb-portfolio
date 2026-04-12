import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  NotFoundRouteProps,
} from '@tanstack/react-router'
import './index.css'
import { Root } from './routes/__root'
import { HomePage } from './routes/index'
import { PortfolioPage } from './routes/portfolio'
import { ProjectPage } from './routes/project'
import { ServicesPage } from './routes/services'
import { AboutPage } from './routes/about'
import { ContactPage } from './routes/contact'
import { NotFoundPage } from './routes/not-found'

// Lazy-load Studio so its ~5MB bundle never downloads for regular visitors
const StudioPageLazy = lazy(() =>
  import('./routes/studio').then((m) => ({ default: m.StudioPage }))
)
function LazyStudio() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="label-tag text-muted-foreground">Loading Studio…</span>
      </div>
    }>
      <StudioPageLazy />
    </Suspense>
  )
}

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: (_props: NotFoundRouteProps) => <NotFoundPage />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: PortfolioPage,
})

const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio/$slug',
  component: ProjectPage,
})

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
})

const studioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/studio',
  component: LazyStudio,
})

const studioSplatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/studio/$',
  component: LazyStudio,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  portfolioRoute,
  projectRoute,
  servicesRoute,
  aboutRoute,
  contactRoute,
  studioRoute,
  studioSplatRoute,
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
