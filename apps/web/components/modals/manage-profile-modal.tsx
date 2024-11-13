import { UserProfile } from '@clerk/nextjs'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import useModalStore from '@/store/modals'

export const MANAGE_PROFILE_NODAL_ID = 'manage-profile'

export default function ManageProfileModal() {
  const { modals, toggleModal } = useModalStore()

  const modalState = modals[MANAGE_PROFILE_NODAL_ID]

  return (
    <Dialog
      open={Boolean(modalState?.open)}
      onOpenChange={() => toggleModal(MANAGE_PROFILE_NODAL_ID)}
    >
      <DialogTitle hidden>test</DialogTitle>
      <DialogContent
        className="flex h-[704px] max-w-[850px] items-center justify-center border-none bg-transparent p-0"
        closeClassName="right-8 lg:right-4"
      >
        <UserProfile routing="virtual" />
      </DialogContent>
    </Dialog>
  )
}
