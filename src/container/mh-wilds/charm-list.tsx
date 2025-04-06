import { useI18n } from "@infrastructure/user-i18n";

interface CharmListProps {
  searchTerm: string;
}

export function CharmList({ searchTerm }: CharmListProps) {
  const { getNamespaceData } = useI18n();
  const translations = getNamespaceData("mhWilds_charm");
  const commonTranslations = getNamespaceData("mhWilds_common");

  const filtered = Object.entries(translations || {}).filter(([, value]) =>
    value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filtered.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {commonTranslations.mhwilds_common_noResults}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map(([key, value]) => (
        <div key={key} className="border p-4 rounded shadow">
          <div className="font-semibold">{value}</div>
        </div>
      ))}
    </div>
  );
}
