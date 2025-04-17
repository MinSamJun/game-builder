import { useI18n } from "@infrastructure/user-i18n";

export function NoResults() {
  const { getNamespaceData } = useI18n();
  const mhWildsmhCommonNamespace = getNamespaceData("mhWilds_common");

  return (
    <div className="text-center py-8 text-gray-500">
      {mhWildsmhCommonNamespace.mhwilds_common_noResults}
    </div>
  );
}
