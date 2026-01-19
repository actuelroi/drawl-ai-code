import ProjectView from "@/components/features/projects/ProjectView"
import { SignInButton } from "@clerk/nextjs"


const page = () => {
  return (
    <>
    <SignInButton>
      sign-in
    </SignInButton>
    <ProjectView/>
    </>
  )
}

export default page
