import { OrganizationProfile, useOrganization, useUser } from '@clerk/nextjs'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import useModalStore from '@/store/modals'

export const MANAGE_ORGANIZATION_MODAL_ID = 'manage-organization'

export default function ManageOrganizationModal() {
  const { modals, toggleModal } = useModalStore()
  const { organization, isLoaded } = useOrganization()
  const { user } = useUser()

  const modalState = modals[MANAGE_ORGANIZATION_MODAL_ID]

  return (
    <Dialog
      open={Boolean(modalState?.open && isLoaded && organization?.id)}
      onOpenChange={() => toggleModal(MANAGE_ORGANIZATION_MODAL_ID)}
    >
      <DialogTitle hidden>test</DialogTitle>
      <DialogContent
        className="flex h-[704px] max-w-[850px] items-center justify-center border-none bg-transparent p-0"
        closeClassName="right-8 lg:right-4"
      >
        <OrganizationProfile
          routing="virtual"
          afterLeaveOrganizationUrl={`/${user?.id}`}
        />
      </DialogContent>
    </Dialog>
  )
}
