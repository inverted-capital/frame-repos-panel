import React, { useState } from 'react'
import { X, Loader } from 'lucide-react'
import { useArtifact } from '@artifact/client/hooks'
import type { RepoListing } from '../RepositoryTree'

interface Props {
  onClose: () => void
  target: RepoListing
}

const NewRepositoryModal: React.FC<Props> = ({ onClose, target }) => {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const artifact = useArtifact()

  const handleCreateRepo = async () => {
    if (!name.trim() || !artifact) return
    setIsLoading(true)
    try {
      const repo = artifact.checkout(target.scope)
      await repo.tree.init(name.trim())
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={(e) => {
        e.stopPropagation()
        if (!isLoading) onClose()
      }}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Create New Repository</h3>
          {!isLoading && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Target: {target.path.join(' / ')}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repository Name*
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="my-awesome-project"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateRepo}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 flex items-center"
            disabled={!name.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={16} className="mr-2 animate-spin" /> Creating...
              </>
            ) : (
              'Create Repository'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewRepositoryModal
