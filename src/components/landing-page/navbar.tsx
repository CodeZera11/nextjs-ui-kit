import Link from "next/link"
import { PageRoutes } from "@/constants/page-routes"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MenuIcon } from "lucide-react"

const NavLinks = [
  {
    title: 'Features',
    href: '#features'
  },
  {
    title: 'Tech Stack',
    href: '#stack'
  },
  {
    title: 'Sign In',
    href: PageRoutes.SIGNIN
  },
]

const Navbar = () => {

  return (
    <div className="h-20 px-10 flex items-center w-full justify-between sticky top-0 bg-gradient-to-r from-gray-900 backdrop-blur-lg">
      <Link
        href={PageRoutes.HOME}
        className="text-2xl font-bold"
      >
        Ui Kit
      </Link>
      <div className="items-center gap-4 hidden md:flex">
        {NavLinks.map(({ title, href }) => (
          <Button
            key={href}
            variant="link"
            className="text-lg"
            asChild
          >
            <Link
              href={href}
            >
              {title}
            </Link>
          </Button>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="md:hidden"
            size="icon"
            variant="ghost"
          >
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit mr-10 flex flex-col gap-5 bg-gray-800 border border-primary">
          {NavLinks.map(({ title, href }) => {
            return (
              <div
                key={href}
                className="p-2 text-white"
              >
                <Link
                  href={href}
                >
                  {title}
                </Link>
              </div>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Navbar