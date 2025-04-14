type Lang = "en" | "ja" | "ko";

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

export const LanguageSelector = ({ lang, onChange }: Props) => {
  const languages: Lang[] = ["ko", "en", "ja"];

  return (
    <div className="mb-6 flex space-x-4">
      {languages.map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-4 py-2 rounded ${
            lang === l ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {l === "ko" ? "한국어" : l === "en" ? "English" : "日本語"}
        </button>
      ))}
    </div>
  );
};
