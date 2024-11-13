export default function Apps() {
  return (
    <div className="w-full flex-1 max-lg:space-y-6">
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex w-full max-w-[80ch] flex-col gap-3">
          <div className="w-full space-y-2">
            <h2 className="truncate text-2xl font-medium tracking-tight">
              Apps
            </h2>

            <p className="truncate text-base text-muted-foreground">
              view and manage apps
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex w-full flex-col gap-2">
          <div className="w-full">
            <section className="flex flex-col gap-4">
              <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                commands
              </header>

              <div>table</div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
