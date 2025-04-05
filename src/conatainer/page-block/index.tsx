import Link from "next/link";

export type PageItem = {
  title: string;
  href: string;
};

export type PageBlockProps = {
  title: string;
  items: PageItem[];
};

export const PageBlock = ({ title, items }: PageBlockProps) => {
  return (
    <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md mb-2">
      <div className="font-bold mb-2">{title}</div>
      {items.map((item, idx) => (
        <div key={idx}>
          <Link href={item.href} className="text-blue-600 hover:underline">
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};
