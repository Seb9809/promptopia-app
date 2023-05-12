import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

//The metadata object defines some metadata for the website.
export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <link
          rel="icon"
          href="https://favicones.vercel.app/api/fluent-emoji-flat:alien"
        />
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav /> {/* Render the Nav component */}
          {children} {/* Render the children components */}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
