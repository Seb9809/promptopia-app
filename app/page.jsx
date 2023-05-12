import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex-col flex-center">
    <h1 className="head_text text-center">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">AI-Powered Prompts</span>
    </h1>
    <p className="desc text-center">
      Promptopia is an open-source AI prompting tool for the modern world to
      discover, create, and share creative prompts
    </p>
    <Feed /> {/* Render the Feed component */}
  </section>
);

export default Home;