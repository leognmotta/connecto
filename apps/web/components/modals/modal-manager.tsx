'use client'

import { useOrganization } from '@clerk/nextjs'
import { useEffect } from 'react'

import useModalStore from '@/store/modals'

import CreateOrganizationModal, {
  CREATE_ORGANIZATION_MODAL_ID,
} from './create-organization-modal'
import ManageOrganizationModal, {
  MANAGE_ORGANIZATION_MODAL_ID,
} from './manage-organization-modal'

export default function ModalManager() {
  const { modals, closeModal } = useModalStore()
  const { isLoaded, organization } = useOrganization()

  useEffect(() => {
    if (isLoaded && !organization?.id) {
      closeModal(MANAGE_ORGANIZATION_MODAL_ID)
    }
  }, [closeModal, isLoaded, organization?.id])

  return (
    <>
      {Boolean(modals[MANAGE_ORGANIZATION_MODAL_ID]?.open) && (
        <ManageOrganizationModal />
      )}
      {Boolean(modals[CREATE_ORGANIZATION_MODAL_ID]?.open) && (
        <CreateOrganizationModal />
      )}
    </>
  )
}
