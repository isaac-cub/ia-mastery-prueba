import { Button } from '@sanity/ui'
import { usePresentationNavigate, usePresentationParams } from 'sanity/presentation'

const PAGES = [
  { label: 'Landing AI Mastery', href: '/preview', type: 'home', id: 'home' },
  { label: 'Página de llamada', href: '/preview/llamada', type: 'llamada', id: 'llamada' },
]

// Panel izquierdo de Presentation: al pulsar, abre esa vista previa y, al lado, su documento.
export function PreviewNavigator() {
  const navigate = usePresentationNavigate()
  const { preview } = usePresentationParams()
  const here = (preview ?? '/preview').split('?')[0].replace(/\/$/, '')

  return (
    <div style={{ padding: 12, display: 'grid', gap: 6 }}>
      {PAGES.map((p) => (
        <Button
          key={p.href}
          mode={here === p.href ? 'default' : 'ghost'}
          tone={here === p.href ? 'primary' : 'default'}
          text={p.label}
          justify="flex-start"
          onClick={() => navigate(p.href, { type: p.type, id: p.id })}
        />
      ))}
    </div>
  )
}
