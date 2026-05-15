import { getSiteSettings } from "@/lib/sanity/queries";

export default async function Footer() {
  const settings = await getSiteSettings();
  const email = settings?.email ?? "leonardofurlan241@gmail.com";
  const phone = settings?.phone ?? "+39 340 195 1100";
  const instagram = settings?.instagram ?? "@_eonard_";
  const instagramUrl = settings?.instagramUrl ?? "https://www.instagram.com/_eonard_/";

  return (
    <div className="footer">
      <a id="email" href={`mailto:${email}`}>{email}</a>
      <a id="empty" />
      <a id="phone" href={`tel:${phone.replace(/[\s]/g, "")}`}>{phone}</a>
      <a
        id="instagram"
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {instagram}
      </a>
    </div>
  );
}
