import ProjectIdView from "@/components/ProjectIdView"


const page = async ({ params }: {
  params: Promise<{ projectId: string }>
}) => {
  const { projectId } = await params
  return (

    <ProjectIdView
      projectId={projectId}

    />

  )
}

export default page
