export default function SectionContainer({ children }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-8 sm:gap-14 sm:px-6 xl:max-w-3xl xl:px-0">
      {children}
    </div>
  )
}
