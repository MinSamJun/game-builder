type Lang = "en" | "ja" | "ko";

type Props = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

export const LanguageSelector = ({ lang, onChange }: Props) => {
  const languages: Lang[] = ["ko", "en", "ja"];

  return (
    <div className="flex space-x-2">
      {languages.map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            lang === l
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {l === "ko" ? "한국어" : l === "en" ? "English" : "日本語"}
        </button>
      ))}
    </div>
  );
};
