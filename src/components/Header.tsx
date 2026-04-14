import { useState } from "react"
import { Search, X } from "lucide-react"
import { CurrentLocation } from "./CurrentLocation"
import { SearchInput } from "./SearchInput"

export const Header = () => {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)

  return (
    <>
      <header className='px-4 py-2 h-16 flex items-center justify-between gap-2 sticky top-0 z-50  backdrop-blur-xl'>
        <div className="flex items-center cursor-pointer shrink-0" title="WeatherBoard">
          <img
            src="/logo-dark.svg"
            alt="Weatherboard Logo"
            className="w-8 h-8 mr-2"
          />
          <h1 className="text-base hover:text-purple-300 text-purple-100 font-semibold">
            <span className="text-purple-400">W</span>
            <span className="hidden md:inline-flex">eather</span> {" "}
            <span className="text-purple-400">B</span>
            <span className="hidden md:inline-flex">oard</span>
          </h1>
        </div>

        <SearchInput className="hidden md:flex" />

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setIsSearchDialogOpen(true)}
            className="md:hidden flex items-center justify-center rounded-lg border border-purple-500/30 bg-purple-900/40 p-2 text-purple-200 hover:bg-purple-800/40 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <CurrentLocation />
        </div>
      </header>

      {isSearchDialogOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-black/60 p-4"
          onClick={() => setIsSearchDialogOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search city"
            className="mt-20 rounded-xl border border-purple-500/30 bg-purple-950/60 backdrop-blur-sm p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-purple-200">Search City</p>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setIsSearchDialogOpen(false)}
                className="rounded-md p-1 text-purple-300 hover:text-purple-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SearchInput autoFocus className="max-w-none" />
          </div>
        </div>
      )}
    </>
  )
}
