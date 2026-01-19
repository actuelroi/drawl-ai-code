'use client'

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

interface Props {
    projectId: string
}


const Tab = ({ label, isActive, onclick }: {
    label: string;
    isActive: boolean;
    onclick: () => void
}) => {
    return (
        <div
            onClick={onclick}
            className={cn("flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent", isActive && "bg-background text-foreground/30")}
        >
            <span className="text-sm">{label}</span>
        </div>
    )
}

const ProjectIdView = ({ projectId }: Props) => {

    const [activeView, setActiveView] = useState<"editor" | 'preview'>('editor')

    return (
        <div className="h-full flex flex-col">
            <nav className="h-8.75 flex items-center bg-sidebar border-b">
                <Tab label="Code"
                    isActive={activeView === "editor"}
                    onclick={() => setActiveView('editor')}
                />
                <Tab label="Preview"
                    isActive={activeView === 'preview'}
                    onclick={() => setActiveView('preview')}
                />
                <div className="flex-1 flex justify-end h-full">
                  <div className="flex items-center gap-2 h-full px-3 cursor-pointer text-muted-foreground border-r hover:bg-accent/30">
                    <FaGithub className="size-3.5" />
                    <span className="text-sm">Export</span>
                  </div>
                </div>
            </nav>
            <div className="flex-1 relative">
                <div className={cn("absolute inset-0", activeView === 'editor' ? "visible" : "invisible")}>
                    <div>Editor</div>
                </div>
                <div className={cn("absolute inset-0",
                     activeView === 'preview' ? "visible" : "invisible")}>
                    <div>Preview</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectIdView
