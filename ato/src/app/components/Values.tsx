import { Icon } from './icons/Icon';
import { JaText } from './JaText';
import { useT } from '../../i18n';

type IconName = "door" | "brush" | "bookmark" | "shelf" | "ai-spark" | "git-branch" | "post" | "smartphone" | "palette";

interface ValueDef {
  titleKey: string;
  rubyKey: string;
  descKey: string;
  icon: IconName;
  features: { key: string; icon: IconName }[];
}

const valueDefs: ValueDef[] = [
  {
    titleKey: "values.door.title", rubyKey: "values.door.ruby", descKey: "values.door.description",
    icon: "door",
    features: [
      { key: "values.door.feature1", icon: "door" },
    ],
  },
  {
    titleKey: "values.brush.title", rubyKey: "values.brush.ruby", descKey: "values.brush.description",
    icon: "brush",
    features: [
      { key: "values.brush.feature1", icon: "palette" },
    ],
  },
  {
    titleKey: "values.bookmark.title", rubyKey: "values.bookmark.ruby", descKey: "values.bookmark.description",
    icon: "bookmark",
    features: [
      { key: "values.bookmark.feature1", icon: "smartphone" },
      { key: "values.bookmark.feature2", icon: "smartphone" },
    ],
  },
  {
    titleKey: "values.shelf.title", rubyKey: "values.shelf.ruby", descKey: "values.shelf.description",
    icon: "shelf",
    features: [
      { key: "values.shelf.feature1", icon: "ai-spark" },
      { key: "values.shelf.feature2", icon: "git-branch" },
      { key: "values.shelf.feature3", icon: "post" },
    ],
  },
];

export function Values() {
  const t = useT();
  return (
    <section className="w-full">
      <div className="text-left mb-4">
        <JaText as="h3" className="ato-heading mb-4" style={{ fontFeatureSettings: "'palt' 1" }}>{t("values.heading")}</JaText>
        <JaText className="ato-body">{t("values.body")}</JaText>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {valueDefs.map((value, index) => {
          const ruby = t(value.rubyKey as any);
          return (
            <div
              key={value.titleKey}
              className="group flex flex-col gap-4 p-5 rounded-2xl bg-ato-surface border border-ato-border shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className="flex items-center gap-3">
                <div className="text-ato-text flex items-center shrink-0 ato-icon-align">
                  <Icon name={value.icon} size={24} />
                </div>
                <div className="flex items-baseline gap-2">
                  <h4 className="ato-subheading">{t(value.titleKey as any)}</h4>
                  {ruby && <span className="ato-body tracking-widest">{ruby}</span>}
                </div>
              </div>

              <JaText className="ato-body">{t(value.descKey as any)}</JaText>

              <ul className="mt-auto space-y-2">
                {value.features.map((feature) => (
                  <li key={feature.key} className="flex items-center gap-2">
                    <span className="ato-icon-align"><Icon name={feature.icon} size={18} /></span>
                    <JaText as="span" className="ato-body tracking-wide">{t(feature.key as any)}</JaText>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
