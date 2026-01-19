import { Doc } from "@/convex/_generated/dataModel"
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react"
import Link from "next/link"

import {formatDistanceToNow} from 'date-fns'
import { FaGithub } from "react-icons/fa"

interface Props{
    data: Doc<'projects'>
}


 export const getProjectionIcon = (project: Doc<"projects">) =>{

    if(project.importStatus === 'completed'){
        return( 
        <FaGithub className="size-3.5 text-muted-foreground"/>
    )
    }

    if(project.importStatus === 'failed'){
        return( 
        <AlertCircleIcon className="size-3.5 text-muted-foreground"/>
    )
    }

    if(project.importStatus === 'importing'){
        return( 
        <Loader2Icon className="size-3.5 text-muted-foreground animate-spin"/>
    )
    }
   
    return (
        <GlobeIcon className="size-3.5 text-muted-foreground" />
    )

   }

export  const formatTimestamp= (timestamp:number)=>{
    return formatDistanceToNow(new Date(timestamp),{
        addSuffix: true
    })
   }



const ProjectItem = ({data}:Props) => {


  

  
  return (
    <Link href={`/projects/${data._id}`}
    className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group"
    >
        <div className="flex items-center gap-2">
         {getProjectionIcon(data)}
          <span className="truncate">{data.name}</span>
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">
         {formatTimestamp(data._creationTime)}
        </span>
    </Link>
  )
}

export default ProjectItem
