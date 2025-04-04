type PageBlockProps = {
  title: string;
  items: string[];
};

function PageBlock({ title, items }: PageBlockProps) {
  return (
    <div className="bg-gray-100 text-black p-4 rounded-lg shadow-md mb-2">
      <div className="font-bold mb-2">{title}</div>
      {items.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <PageBlock
        title="구현된 페이지"
        items={["구현된 페이지 1", "구현된 페이지 2", "구현된 페이지 3"]}
      />
      <PageBlock
        title="구현중인 페이지"
        items={["구현중인 페이지 1", "구현중인 페이지 2", "구현중인 페이지 3"]}
      />
      <PageBlock
        title="구현할 페이지"
        items={["구현할 페이지 1", "구현할 페이지 2", "구현할 페이지 3"]}
      />
    </>
  );
}
