'use client'

import { PageRoutes } from '@/constants/page-routes'
import { User } from '@/constants/types'
import { File, Menu, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import UserButton from './user-button'
import { UserRoleEnum } from '@/constants/enums'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { usePathname } from 'next/navigation'

const ICON_SIZE = 20

const navigationItems = [
  {
    title: 'Clients',
    link: PageRoutes.dashboard.admin.CLIENTS,
    icon: <UserIcon size={ICON_SIZE} />,
    roles: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.CASE_MANAGER]
  },
  {
    title: 'Cases',
    link: PageRoutes.dashboard.CASES,
    icon: <File size={ICON_SIZE} />,
    roles: [UserRoleEnum.SUPER_ADMIN, UserRoleEnum.CASE_MANAGER]
  },
]

interface NavigationLinkProps {
  title: string
  link: string
  icon?: React.ReactNode
}
const NavigationLink = ({ link, title, icon }: NavigationLinkProps) => {
  const pathName = usePathname()
  return (
    <Link
      className={`flex items-center rounded-lg py-2 ${link === pathName ? 'text-[#C4C6C8]' : 'text-[#939496]'
        } gap-2 text-base transition-all hover:text-[#C4C6C8] dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`}
      href={link}
    >
      <span className={'w-5'}>{icon}</span>
      {title}
    </Link>
  )
}

export default function NavBar({ user }: { user: User }) {
  return (
    <div className="flex w-full items-center justify-between gap-2 bg-light_black text-[#C4C6C8] px-7 py-4 dark:bg-gray-800/40">
      <div className="flex w-full items-center justify-between gap-2 font-semibold ">
        <Link href='/' className="flex items-center gap-2 font-semibold">
          <span>Fortune</span>
        </Link>
        <nav className="hidden items-center gap-10 text-sm font-medium text-primary xl:flex">
          {navigationItems
            .filter((item) => item.roles.includes(user.role))
            .map((item) => (
              <NavigationLink key={item.title} link={item?.link} title={item.title} icon={item.icon} />
            ))}
        </nav>
        <UserButton user={user} />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="xl:hidden" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-start text-primary">Fortune</SheetTitle>
          </SheetHeader>
          <div className="mt-10 grid gap-5">
            {navigationItems
              .filter((item) => item.roles.includes(user.role))
              .map((item) => (
                <NavigationLink key={item.title} link={item.link} title={item.title} icon={item.icon} />
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
