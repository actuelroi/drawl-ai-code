



import { useProjectsPartial } from "@/app/hooks/use-projects"
import { Spinner } from "@/components/ui/spinner"
import ProjectItem, { formatTimestamp, getProjectionIcon } from "./ProjectItem"
import { Doc } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"


interface ProjectListProps {
  onViewAll: () => void
}

const ProjectList = ({ onViewAll }: ProjectListProps) => {

  const projects = useProjectsPartial(6)

  if (projects === undefined) {
    return (
      <Spinner className="size-4 text-ring" />
    )
  }


  const ContinueCard = ({ data }: { data: Doc<'projects'> }) => {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">
          Last updated
        </span>
        <Button
          variant={'outline'}
          asChild
          className="h-auto items-start justify-start p-4 bg-background border rounded-none flex flex-col gap-2"
        >
          <Link href={`/projects/${data._id}`} className="group">
            <div className="flex items-center gap-2">
              {getProjectionIcon(data)}
              <span className="font-medium truncate">
                {data.name}
              </span>
            </div>
            <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform"/>
            <span className="text-xs text-muted-foreground">
               {formatTimestamp(data.updatedAt)}
            </span>
          </Link>
        </Button>
      </div>
    )
  }

  const [mostRecent, ...rest] = projects



  return (
    <div className="flex flex-col gap-4">
        
        {mostRecent ? (
          <ContinueCard data={mostRecent}/>
        ):null}

      {rest.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Recent projects
            </span>
            <button
            onClick={onViewAll}
              className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              <span>View all</span>
              <kbd className="bg-accent border">
                Ctrl K
              </kbd>
            </button>
          </div>
          
          <ul className="flex flex-col">
            {projects.map((project) => (
              <ProjectItem
                key={project._id}
                data={project}
              />
            ))}
          </ul>
        </>
      )}

    </div>
  )
}

export default ProjectList
