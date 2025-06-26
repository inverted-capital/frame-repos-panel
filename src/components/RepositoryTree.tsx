import React from 'react'
import { FolderGit2, Home, Link } from 'lucide-react'
import { useTree, useFrame } from '@artifact/client/hooks'
import { ArtifactSyncer } from '@artifact/client/react'
import { isRepoScope, RepoScope } from '@artifact/client/api'

export type RepoListing = { name: string; scope: RepoScope; path: string[] }

export type RepositoryTreeProps = {
  onSelect?: (repo: RepoListing) => void
  selected?: RepoListing | null
}

const RepositoryTreeRoot: React.FC<RepositoryTreeProps> = ({
  onSelect,
  selected
}) => {
  const { target } = useFrame()
  if (!target || !isRepoScope(target)) return <div>Loading repositories...</div>
  return (
    <RepositoryNode
      scope={target}
      name={'home'}
      path={['home']}
      onSelect={onSelect}
      selected={selected}
      home
    />
  )
}

const RepositoryNode: React.FC<{
  scope: RepoScope
  name: string
  onSelect?: (repo: RepoListing) => void
  home?: boolean
  path: string[]
  selected?: RepoListing | null
}> = ({ scope, name, onSelect, home, path, selected }) => {
  const children = useTree()

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.({ name, scope, path })
  }

  const isSelected = selected?.scope.repo === scope.repo

  return (
    <div className="py-1">
      <div
        className={`flex items-center py-1.5 px-2 rounded-md hover:bg-gray-100 cursor-pointer${
          isSelected ? ' bg-blue-50' : ''
        }`}
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
                path={[...path, stripDotJson(child.name)]}
                onSelect={onSelect}
                selected={selected}
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
