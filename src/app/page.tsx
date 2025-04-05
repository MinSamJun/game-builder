import { PageBlock } from "@/conatainer/page-block";

export default function Home() {
  return (
    <main className="p-4">
      <PageBlock
        title="구현된 페이지"
        items={[
          { title: "구현된 페이지 1", href: "/" },
          { title: "구현된 페이지 2", href: "/" },
          { title: "구현된 페이지 3", href: "/" },
        ]}
      />
      <PageBlock
        title="구현중인 페이지"
        items={[
          { title: "몬헌 와일즈", href: "/mh-wilds" },
          { title: "구현중인 페이지 2", href: "/" },
          { title: "구현중인 페이지 3", href: "/" },
        ]}
      />
      <PageBlock
        title="구현할 페이지"
        items={[
          { title: "구현할 페이지 1", href: "/" },
          { title: "구현할 페이지 2", href: "/" },
          { title: "구현할 페이지 3", href: "/" },
        ]}
      />
    </main>
  );
}
