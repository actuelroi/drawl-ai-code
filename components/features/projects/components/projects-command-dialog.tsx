import { useProjects } from "@/hooks/use-projects";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { useRouter } from "next/navigation";
import { getProjectionIcon } from "../ProjectItem";



interface ProjectCommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


const ProjectCommandDialog = ({
    onOpenChange, open }:
    ProjectCommandProps) => {

    const router = useRouter()
    const projects = useProjects()

    const handleSelect = (projectId: string) => {
        router.push(`/projects/${projectId}`)
        onOpenChange(false)
    }



    return (
        <Command>

            <CommandDialog
                open={open}
                onOpenChange={onOpenChange}
                title="Search Projects"
                description="Search and navigate to your projects"
            >
                <CommandInput placeholder="Search projects" />
                <CommandList>
                    <CommandEmpty>No project found.</CommandEmpty>
                    <CommandGroup heading='Projects'>
                        {projects?.map((project) => (
                            <CommandItem
                                key={project._id}
                                value={`${project.name}-${project._id}`}
                            >
                                {getProjectionIcon(project)}
                                <span>{project.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>

            </CommandDialog>
        </Command>
    )
}

export default ProjectCommandDialog
