import React, { useCallback, useMemo, useState } from 'react'

import Button from '@Components/Button'

import Modal from '.'

type Props = {
  title?: React.ReactNode
  content?: React.ReactNode
  onConfirm?: () => Promise<void>
  onCancel?: () => Promise<void>
  children: (onClick: () => void) => JSX.Element
}

const ConfirmModal = ({
  title,
  content,
  onConfirm,
  onCancel,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleClickChildren = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClickConfirm = useCallback(() => {
    if (onConfirm) {
      setIsLoading(true)
      onConfirm?.()
        .then(() => {
          setIsOpen(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    } else {
      setIsOpen(false)
    }
  }, [onConfirm])

  const handleClickCancel = useCallback(() => {
    if (onCancel) {
      setIsLoading(true)
      onCancel?.()
        .then(() => {
          setIsOpen(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    } else {
      setIsOpen(false)
    }
  }, [onCancel])

  const _children = useMemo(
    () => children(handleClickChildren),
    [children, handleClickChildren]
  )

  return (
    <>
      {_children}

      <Modal open={isOpen}>
        <div className="space-y-6 text-left">
          <h5>{title}</h5>
          <p>{content}</p>
          <div className="flex justify-end gap-x-4">
            <Button
              type="button"
              className="text-red-500 border-red-500"
              onClick={handleClickConfirm}
              disabled={isLoading}
            >
              Confirm
            </Button>
            <Button type="button" onClick={handleClickCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default React.memo(ConfirmModal)
