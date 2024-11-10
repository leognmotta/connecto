export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate flex flex-shrink-0 flex-col">
      <header className="bg-gray-100">
        <div className="flex items-center justify-between gap-3 overflow-x-auto border-b bg-gray-100 py-2 pl-2 pr-4 md:pl-3.5 md:pr-5">
          <div className="flex items-center gap-1">a</div>
          <div className="flex items-center gap-3.5">b</div>
        </div>
      </header>
      <div className="sticky top-0 z-10 border-transparent before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gray-300 before:opacity-0">
        <div className="absolute inset-x-0 -top-0.5 h-px"></div>
      </div>
      {children}
    </div>
  )
}
