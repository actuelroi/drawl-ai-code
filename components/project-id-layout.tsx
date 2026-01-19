"use client"

import React from 'react'
import Navbar from './Navbar'
import { Id } from '@/convex/_generated/dataModel'
import { Allotment } from 'allotment'
//@ts-ignore
import "allotment/dist/style.css";



interface Props {
    projectId: string
    children: React.ReactNode
}


const MIN_SIDEBAR_WIDTH = 200
const MAX_SIDEBAR_WIDTH = 800
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 200
const DEFAULT_MAIN_SIZE = 200

const ProjectIdLayout = ({ projectId, children }: Props) => {
    return (
        <main className='w-full h-screen flex flex-col'>
            <Navbar
                projectId={projectId as Id<'projects'>}
            />
            <div className='flex-1 flex overflow-hidden'>
                <Allotment
                className='flex-1'
                defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
                >
                    <Allotment.Pane
                    snap
                    minSize={MIN_SIDEBAR_WIDTH}
                    maxSize={MAX_SIDEBAR_WIDTH}
                    preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
                    >
                     Conversation SideBar
                    </Allotment.Pane>

                    <Allotment.Pane>
                    {children}

                    </Allotment.Pane>

                </Allotment>
            </div>
        </main>
    )
}

export default ProjectIdLayout
