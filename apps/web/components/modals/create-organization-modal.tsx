import { CreateOrganization } from '@clerk/nextjs'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import useModalStore from '@/store/modals'

export const CREATE_ORGANIZATION_MODAL_ID = 'create-organization'

export default function CreateOrganizationModal() {
  const { modals, toggleModal, closeModal } = useModalStore()

  const modalState = modals[CREATE_ORGANIZATION_MODAL_ID]

  return (
    <Dialog
      open={Boolean(modalState?.open)}
      onOpenChange={() => toggleModal(CREATE_ORGANIZATION_MODAL_ID)}
    >
      <DialogTitle hidden>test</DialogTitle>
      <DialogContent
        className="flex h-[360px] max-w-[432px] items-center justify-center border-none bg-transparent p-0"
        closeClassName="right-8 lg:right-4"
      >
        <CreateOrganization
          routing="virtual"
          hideSlug
          skipInvitationScreen
          afterCreateOrganizationUrl={(organization) => {
            closeModal(CREATE_ORGANIZATION_MODAL_ID)
            return `/${organization.id}`
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
