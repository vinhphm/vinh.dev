const Hero = () => {
  return (
    <div className="flex h-content w-full flex-col justify-around text-center sm:h-content-sm">
      <h1 className="my-28 select-none text-center text-6xl font-extrabold leading-none tracking-tightest sm:my-10 sm:text-8.5xl">
        <span
          data-content="Develop"
          className="relative block before:absolute before:top-0 before:bottom-0 before:left-0 before:block before:w-full before:animate-gradient-background-1 before:px-2 before:text-center before:text-black before:content-[attr(data-content)] dark:before:text-white dark:before:content-[attr(data-content)]"
        >
          <span className="animate-gradient-foreground-1 bg-gradient-to-br from-gradient-1-start to-gradient-1-end bg-clip-text px-2 text-transparent">
            Develop
          </span>
        </span>
        <span
          data-content="Showcase"
          className="relative block before:absolute before:top-0 before:bottom-0 before:left-0 before:block before:w-full before:animate-gradient-background-2 before:px-2 before:text-center before:text-black before:content-[attr(data-content)] dark:before:text-white dark:before:content-[attr(data-content)]"
        >
          <span className="animate-gradient-foreground-2 bg-gradient-to-br from-gradient-2-start to-gradient-2-end bg-clip-text px-2 text-transparent">
            Showcase
          </span>
        </span>
        <span
          data-content="Blog"
          className="relative block before:absolute before:top-0 before:bottom-0 before:left-0 before:block before:w-full before:animate-gradient-background-3 before:px-2 before:text-center before:text-black before:content-[attr(data-content)] dark:before:text-white dark:before:content-[attr(data-content)]"
        >
          <span className="animate-gradient-foreground-3 bg-gradient-to-br from-gradient-3-start to-gradient-3-end bg-clip-text px-2 text-transparent">
            Blog
          </span>
        </span>
      </h1>
      <div className="space-y-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Hi, I'm
          <span className="animate-fade-text"> Vinh Ph</span>
          <span>a</span>
          <span className="animate-fade-text">m</span>
        </h1>
        <p className="prose max-w-none text-lg leading-7 text-neutral-500 dark:text-neutral-400">
          Web Developer who codes for passion and designs for fun.
        </p>
      </div>
    </div>
  )
}

export default Hero
