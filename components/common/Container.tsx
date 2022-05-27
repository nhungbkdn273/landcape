import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode,
  className?: string,
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={`w-[820px] mx-auto${className || ""}`}>
      {children}
    </div>
}

export default Container