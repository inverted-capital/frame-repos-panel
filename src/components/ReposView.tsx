import { useState, useCallback } from 'react'
import { FolderGit2, Plus, GitFork, Link as LinkIcon } from 'lucide-react'
import { RepoScope } from '@artifact/client/api'
import RepositoryCard from './RepositoryCard'
import RepositoryTree from './RepositoryTree'
import NewRepositoryModal from './modals/NewRepositoryModal'
import CloneRepositoryModal from './modals/CloneRepositoryModal'
import LinkRepositoryModal from './modals/LinkRepositoryModal'

export default function ReposView() {
  const [selected, setSelected] = useState<RepoScope | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [showClone, setShowClone] = useState(false)
  const [showLink, setShowLink] = useState(false)

  const handleSelect = useCallback((s: RepoScope) => {
    setSelected(s)
  }, [])

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FolderGit2 className="mr-2" size={24} /> Repositories
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowNew(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <Plus size={16} className="mr-2" /> New Repo
          </button>
          <button
            onClick={() => setShowClone(true)}
            className="border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2 rounded-md flex items-center transition-colors"
          >
            <GitFork size={16} className="mr-2" /> Clone
          </button>
          <button
            onClick={() => setShowLink(true)}
            className="border border-gray-200 bg-white hover:bg-gray-50 px-3 py-2 rounded-md flex items-center transition-colors"
          >
            <LinkIcon size={16} className="mr-2" /> Link
          </button>
        </div>
      </div>

      {selected && (
        <div className="mb-6">
          <RepositoryCard repo={selected} />
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-medium mb-4">Repository Structure</h2>
        <div className="mt-4">
          <RepositoryTree onSelect={handleSelect} />
        </div>
      </div>

      {showNew && <NewRepositoryModal onClose={() => setShowNew(false)} />}
      {showClone && (
        <CloneRepositoryModal onClose={() => setShowClone(false)} />
      )}
      {showLink && <LinkRepositoryModal onClose={() => setShowLink(false)} />}
    </div>
  )
}
