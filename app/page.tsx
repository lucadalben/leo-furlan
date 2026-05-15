import Link from "next/link";
import Footer from "@/components/Footer";
import ThreeBallWrapper from "@/components/ThreeBallWrapper";
import { getHomepageSettings } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  const settings = await getHomepageSettings();
  const artistName = settings?.artistName ?? "Leonardo Furlan";
  const tagline = settings?.tagline ?? "Italian artist based in Venice (IT).";

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <ThreeBallWrapper settings={settings?.ball} />

      <section className="home-container">
        <div className="menu">
          <div className="name">
            <Link href="/">{artistName}</Link>
          </div>
          <div className="bio">
            <span>{tagline}</span>
          </div>
          <div className="works">
            <Link href="/works">Works</Link>
          </div>
          <div className="info">
            <Link href="/info">Info</Link>
          </div>
        </div>

        <div className="footer home-footer">
          <Footer />
        </div>
      </section>
    </main>
  );
}
