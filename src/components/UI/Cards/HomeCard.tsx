import { PageRoutes } from '@src/constants'
import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface HomeCardProps {
  icon: ReactNode,
  title: string,
  navigatePath: PageRoutes
}

export const HomeCard: FC<HomeCardProps> = ({icon, title, navigatePath}) => {
  const navigate = useNavigate()
  return (
    <section 
      className='flex flex-col p-3 items-center border border-gray-500 rounded-3xl md:hover:scale-110 md:hover:bg-purple-700 transition-transform duration-500 md:cursor-pointer' 
      onClick={() => navigate(navigatePath)}
    >
      {icon}
      <p className='text-blue-200 mb-2 text-xl'>{title}</p>
    </section>
  )
}