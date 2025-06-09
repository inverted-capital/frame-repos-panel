import React, { useState } from 'react'
import { X, Loader } from 'lucide-react'
import { useRepoStore } from '../state'
import { useArtifact } from '@artifact/client/hooks'

interface NewRepositoryModalProps {
  onClose: () => void
}

const NewRepositoryModal: React.FC<NewRepositoryModalProps> = ({ onClose }) => {
  const [newRepoName, setNewRepoName] = useState('')
  const [newRepoDesc, setNewRepoDesc] = useState('')
  const [newRepoLang, setNewRepoLang] = useState('JavaScript')
  const [isLoading, setIsLoading] = useState(false)

  const { addRepository, selectRepository } = useRepoStore()
  const artifact = useArtifact()

  const handleCreateRepo = async () => {
    if (!newRepoName.trim() || !artifact) return

    setIsLoading(true)

    try {
      // Initialize the repository in Artifact
      await artifact.tree.init(newRepoName.trim())

      // Create the repository in our local state
      const newRepo = {
        name: newRepoName.trim(),
        description: newRepoDesc.trim() || 'No description provided',
        stars: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
        language: newRepoLang
      }

      const newRepoId = addRepository(newRepo)
      selectRepository(newRepoId)
      onClose()
    } catch (error) {
      console.error('Error creating repository:', error)
      // You could add error handling UI here
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repository Name*
            </label>
            <input
              type="text"
              value={newRepoName}
              onChange={(e) => setNewRepoName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="my-awesome-project"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newRepoDesc}
              onChange={(e) => setNewRepoDesc(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your repository (optional)"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Language
            </label>
            <select
              value={newRepoLang}
              onChange={(e) => setNewRepoLang(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
              <option value="Go">Go</option>
              <option value="Rust">Rust</option>
            </select>
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
            disabled={!newRepoName.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={16} className="mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Repository'
            )}
          </button>
        </div>

        {isLoading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Initializing repository, please wait...
          </div>
        )}
      </div>
    </div>
  )
}

export default NewRepositoryModal
