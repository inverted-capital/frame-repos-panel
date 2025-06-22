import React from 'react'
import useViewportSize from '../../hooks/useViewportSize'

interface Props {
  title: string
  message: string
  confirmText: string
  confirmButtonClass: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationModal: React.FC<Props> = ({
  title,
  message,
  confirmText,
  confirmButtonClass,
  onConfirm,
  onCancel
}) => {
  const { width, height } = useViewportSize()
  return (
    <div
      className="absolute bg-black/20 flex items-center justify-center z-50"
      style={{ width, height, top: 0, left: 0 }}
      onClick={(e) => {
        e.stopPropagation()
        onCancel()
      }}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-xl max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <p
          className="text-gray-600 mb-4"
          dangerouslySetInnerHTML={{ __html: message }}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button onClick={onConfirm} className={confirmButtonClass}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
