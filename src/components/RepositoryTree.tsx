import React from 'react'
import { FolderGit2, Home, Link } from 'lucide-react'
import { useTree, useScope } from '@artifact/client/hooks'
import { ArtifactSyncer } from '@artifact/client/react'
import { isRepoScope, RepoScope } from '@artifact/client/api'

export type RepoListing = { name: string; scope: RepoScope }

export type RepositoryTreeProps = {
  onSelect?: (repo: RepoListing) => void
}

const RepositoryTreeRoot: React.FC<RepositoryTreeProps> = ({ onSelect }) => {
  const scope = useScope()
  if (!scope || !isRepoScope(scope)) return <div>Loading repositories...</div>
  return <RepositoryNode scope={scope} name={'home'} onSelect={onSelect} home />
}

const RepositoryNode: React.FC<{
  scope: RepoScope
  name: string
  onSelect?: (repo: RepoListing) => void
  home?: boolean
}> = ({ scope, name, onSelect, home }) => {
  const children = useTree()

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.({ name, scope })
  }

  return (
    <div className="py-1">
      <div
        className="flex items-center py-1.5 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
        onClick={handleSelect}
      >
        <div className="w-5 flex-shrink-0" />
        <div className="flex items-center flex-1 min-w-0">
          <div className="mr-2 text-gray-500">
            {home ? <Home size={16} /> : <FolderGit2 size={16} />}
          </div>
          <div className="truncate font-medium text-sm" title={scope.repo}>
            {name}
          </div>
          {!home && <Link size={14} className="ml-2 text-purple-500" />}
        </div>
      </div>

      {children && children.length > 0 && (
        <div className="pl-4 border-l border-gray-200 ml-2">
          {children.map((child) => (
            <ArtifactSyncer key={child.scope.repo} {...child.scope}>
              <RepositoryNode
                scope={child.scope}
                name={stripDotJson(child.name)}
                onSelect={onSelect}
              />
            </ArtifactSyncer>
          ))}
        </div>
      )}
    </div>
  )
}

export default RepositoryTreeRoot

function stripDotJson(name: string) {
  if (name.endsWith('.json')) {
    return name.substring(0, name.length - '.json'.length)
  }
  return name
}
