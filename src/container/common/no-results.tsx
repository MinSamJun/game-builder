import { useI18n } from "@infrastructure/user-i18n";

export function NoResults() {
  const { getNamespaceData } = useI18n();
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common");

  return (
    <div className="text-center py-8 text-gray-500">
      {mhWildsCommonNamespace.mhwilds_common_noResults}
    </div>
  );
}
