import { OrganizationProfile } from '@clerk/nextjs'

export default function Workflows() {
  return (
    <div>
      <h1>workflows</h1>

      <OrganizationProfile routing="virtual" />
      <OrganizationProfile routing="virtual" />
    </div>
  )
}
