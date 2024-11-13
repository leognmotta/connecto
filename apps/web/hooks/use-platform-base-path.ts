import { useParams } from 'next/navigation'

export function usePlatformBasePath() {
  const { workspaceId } = useParams<{ workspaceId: string }>()

  return `/${workspaceId}`
}
