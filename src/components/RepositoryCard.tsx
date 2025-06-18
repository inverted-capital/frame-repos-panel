import { FolderGit2 } from 'lucide-react'
import type { RepoListing } from './RepositoryTree'

export default function RepositoryCard({ repo }: { repo: RepoListing }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-2">
      <div className="flex items-center">
        <FolderGit2 className="mr-2" size={18} />
        <h3 className="font-medium text-blue-600">{repo.name}</h3>
      </div>
      <p className="text-xs text-gray-500 mt-1">Repo ID: {repo.scope.repo}</p>
      <p className="text-xs text-gray-500">DID: {repo.scope.did}</p>
    </div>
  )
}
