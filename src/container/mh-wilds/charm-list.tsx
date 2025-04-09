import { useI18n } from "@infrastructure/user-i18n";
import mhWildsCharmData from "@/data/mh-wilds/mhwilds-charm-i18n.json";
import { NoResults } from "@container/common/no-results";
import { mhWildsSeriesSkillEn } from "@/infrastructure/i18n/mh-wilds/en";

interface CharmListProps {
  searchTerm: string;
}

interface Charm {
  name: string;
  part: string;
  rank: string;
  skills?: Record<string, number | undefined>;
  slots?: number[];
}

export function CharmList({ searchTerm }: CharmListProps) {
  const { getNamespaceData } = useI18n();
  const mhWildsCharmNamespace = getNamespaceData("mhWilds_charm");
  const mhWildsCharmSkillNamespace = getNamespaceData("mhWilds_armor_skill");
  const mhWildsCommonNamespace = getNamespaceData("mhWilds_common");

  const filteredCharmList = (mhWildsCharmData as Charm[]).filter(({ name }) =>
    (mhWildsCharmNamespace[name] ?? name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {filteredCharmList.length === 0 ? (
        <NoResults />
      ) : (
        <>
          <div className=" gap-4 text-sm">
            {filteredCharmList.map(({ name, skills }) => (
              <div key={name} className="border p-4 rounded shadow space-y-2">
                <div className="font-semibold text-base">
                  {mhWildsCharmNamespace[name]}
                </div>

                <div className="bg-gray-800 text-white rounded p-4">
                  <strong>
                    {mhWildsCommonNamespace?.mhwilds_common_skills}:
                  </strong>
                  {skills && Object.keys(skills).length > 0 ? (
                    Object.entries(skills).map(([skill, level]) => (
                      <div key={skill}>
                        {mhWildsCharmSkillNamespace?.[skill] ?? skill} Lv{" "}
                        {level}
                      </div>
                    ))
                  ) : (
                    <div>{mhWildsCommonNamespace?.mhwilds_common_none}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
