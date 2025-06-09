import { FolderGit2 } from 'lucide-react'
import { RepoScope } from '@artifact/client/api'

export default function RepositoryCard({ repo }: { repo: RepoScope }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-2">
      <div className="flex items-center">
        <FolderGit2 className="mr-2" size={18} />
        <h3 className="font-medium text-blue-600">{repo.repo}</h3>
      </div>
      <p className="text-xs text-gray-500 mt-1">Repository DID: {repo.did}</p>
    </div>
  )
}
