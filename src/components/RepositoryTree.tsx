import React, { useState } from 'react'
import { ChevronDown, ChevronRight, FolderGit2, Home, Link } from 'lucide-react'
import { useTree, useScope } from '@artifact/client/hooks'
import { ArtifactSyncer } from '@artifact/client/react'
import { isRepoScope, RepoScope } from '@artifact/client/api'

export type RepositoryTreeProps = {
  onSelect?: (scope: RepoScope) => void
}

const RepositoryTreeRoot: React.FC<RepositoryTreeProps> = ({ onSelect }) => {
  const scope = useScope()
  if (!scope || !isRepoScope(scope)) return <div>Loading repositories...</div>
  return <RepositoryNode scope={scope} onSelect={onSelect} home />
}

const RepositoryNode: React.FC<{
  scope: RepoScope
  onSelect?: (scope: RepoScope) => void
  home?: boolean
}> = ({ scope, onSelect, home }) => {
  const [isOpen, setIsOpen] = useState(true)
  const children = useTree()

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (children && children.length > 0) {
      setIsOpen((prev) => !prev)
    }
  }

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.(scope)
  }

  return (
    <div className="py-1">
      <div
        className="flex items-center py-1.5 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
        onClick={handleSelect}
      >
        <div className="w-5 flex-shrink-0" onClick={handleToggle}>
          {children && children.length > 0 ? (
            isOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )
          ) : (
            <span className="w-4" />
          )}
        </div>
        <div className="flex items-center flex-1 min-w-0">
          <div className="mr-2 text-gray-500">
            {home ? <Home size={16} /> : <FolderGit2 size={16} />}
          </div>
          <div className="truncate font-medium text-sm">{scope.repo}</div>
          {!home && <Link size={14} className="ml-2 text-purple-500" />}
        </div>
      </div>

      {children && children.length > 0 && (
        <div
          className={`pl-4 border-l border-gray-200 ml-2 ${isOpen ? '' : 'hidden'}`}
        >
          {children.map((child) => (
            <ArtifactSyncer key={child.repo} {...child}>
              <RepositoryNode scope={child} onSelect={onSelect} />
            </ArtifactSyncer>
          ))}
        </div>
      )}
    </div>
  )
}

export default RepositoryTreeRoot
