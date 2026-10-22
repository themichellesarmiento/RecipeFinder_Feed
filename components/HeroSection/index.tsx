import GlobalSearchBar from "../GlobalSearchBar.tsx";

const HeroSection = () => {
  return (
    <section className='mx-auto max-w-3xl px-4 pb-4 pt-6 text-center md:pt-10'>
      <h1 className='font-display text-4xl text-text-primary md:text-5xl'>
        Find your next favorite recipe
      </h1>
      <p className='mt-3 text-text-primary/70'>
        Shared by home cooks. Search, browse by category, and join the discussion.
      </p>
      <GlobalSearchBar />
    </section>
  )
}

export default HeroSection;