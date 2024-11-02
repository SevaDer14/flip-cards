import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className='font-mono'>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
