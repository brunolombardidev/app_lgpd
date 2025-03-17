import Link from "next/link"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        LGPD
      </Link>
      <button className="text-gray-600 hover:text-gray-800">
        <Menu size={24} />
      </button>
    </header>
  )
}

