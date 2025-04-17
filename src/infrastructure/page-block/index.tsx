import Link from "next/link";

export type PageItem = {
  pageTitle: string;
  pageHref: string;
};

export type PageBlockProps = {
  title: string;
  items: PageItem[];
  titleHref?: string;
};

export const PageBlock = ({ title, items, titleHref }: PageBlockProps) => {
  return (
    <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md mb-2">
      <div className="font-bold mb-2 text-lg">
        {titleHref ? (
          <Link href={titleHref} className="text-black hover:underline">
            {title}
          </Link>
        ) : (
          title
        )}
      </div>
      {items.map((item, idx) => (
        <div key={idx}>
          <Link href={item.pageHref} className="text-blue-600 hover:underline">
            {item.pageTitle}
          </Link>
        </div>
      ))}
    </div>
  );
};
