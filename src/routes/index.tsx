import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="prose max-w-lg mx-auto py-32">
      <h1>Flash</h1>
    </div>
  )
}
