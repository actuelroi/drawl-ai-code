'use client'

import { Id } from '@/convex/_generated/dataModel'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import { useProject, useRenameProject } from '@/hooks/use-projects'
import { useState } from 'react'

interface Prop {
    projectId: Id<'projects'>
}



const Navbar = ({ projectId }: Prop) => {
    const project = useProject(projectId)
    const renameProject = useRenameProject(projectId)

    const [isEditing, setIsEditing] = useState(false)

    const [name, setName] = useState('')

    const handleRename = () => {

        if (!project) {
            return
        }
        setName(project.name)
        setIsEditing(true)
    }

    const handleSubmit= ()=>{
        setIsEditing(false);
        const trimmedName= name.trim()

        if(!trimmedName || trimmedName === project?.name){

            return
        }

        renameProject({id: projectId, name: trimmedName})

    }

    const handleKeyDown= (e: React.KeyboardEvent)=>{

    if(e.key === 'Enter'){
        handleSubmit();
    }else if(e.key === 'Escape'){
        setIsEditing(false)
    }

    }


    return (
        <div className='flex justify-between items-center gap-x-2 bg-sidebar border-b'>
            <div className='flex items-center gap-x-2'>
                <Breadcrumb>
                    <BreadcrumbList className='gap-0!'>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className='flex items-center gap-1.5'
                                asChild
                            >
                                <Button variant={"ghost"} className='w-fit! p-1.5! h-7!'>
                                    <Link href={'/'}
                                        className='flex flex-row space-x-1'
                                    >
                                        <Image
                                            src={"/logo.svg"}
                                            alt='Logo'
                                            width={20}
                                            height={20}
                                        />
                                        <span className={cn('text-sm font-medium')}>Polaris</span>
                                    </Link>
                                </Button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='ml-0! mr-1 ' />
                        <BreadcrumbItem>
                            {
                                isEditing ? (
                                    <input
                                        autoFocus
                                        type='text'
                                        onFocus={(e) => e.currentTarget.select}
                                        value={project?.name}
                                        onChange={(e) => setName(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onBlur={()=>{}}
                                        className='text-sm bg-transparent text-foreground  font-medium max-w-40 truncate outline-none focus:ring-1 focus:ring-inset'
                                    />
                                ) : (
                                    <BreadcrumbPage
                                        onClick={handleRename}
                                        className='text-sm cursor-pointer hover:text-primary'
                                    >

                                        {project?.name ?? "Loading ..."}
                                    </BreadcrumbPage>
                                )
                            }





                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <UserButton />
        </div>
    )
}

export default Navbar
