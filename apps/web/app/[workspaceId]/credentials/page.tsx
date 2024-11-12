import { OrganizationProfile } from '@clerk/nextjs'

export default function Credentials() {
  return (
    <div>
      <h1>credentials</h1>

      <OrganizationProfile routing="virtual" />
      <OrganizationProfile routing="virtual" />
    </div>
  )
}
