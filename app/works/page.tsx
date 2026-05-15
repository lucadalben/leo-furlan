import Navbar from "@/components/Navbar";
import WorksGallery from "@/components/WorksGallery";
import { getAllArtworks } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function WorksPage() {
  const artworks = await getAllArtworks();

  return (
    <>
      <Navbar />
      <WorksGallery artworks={artworks} />
    </>
  );
}
