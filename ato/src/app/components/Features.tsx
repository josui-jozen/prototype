import { Icon } from './icons/Icon';
import { JaText } from './JaText';
import { useT } from '../../i18n';

const techIcons = [
  { key: "features.tech.markdown" as const, icon: <Icon name="md-stamp" size={24} /> },
  { key: "features.tech.ai" as const, icon: <Icon name="ai-spark" size={24} /> },
  { key: "features.tech.git" as const, icon: <Icon name="git-branch" size={24} /> },
  { key: "features.tech.publish" as const, icon: <Icon name="post" size={24} /> },
];

export function Features() {
  const t = useT();
  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-6">
        {/* 和文組版 */}
        <div className="flex-1 min-w-0 space-y-4">
          <JaText as="h2" className="ato-heading sm:pt-[0.5em]">{t("features.typesetting.heading")}</JaText>
          <JaText className="ato-body">{t("features.typesetting.body")}</JaText>
        </div>

        {/* × */}
        <div className="ato-subheading font-light shrink-0 self-center hidden sm:block">
          ×
        </div>

        {/* テクノロジー */}
        <div className="flex-1 min-w-0 space-y-4">
          <JaText as="h2" className="ato-heading tracking-[-0.05em] sm:pt-[0.5em]" style={{ fontFeatureSettings: "'palt' 1" }}>{t("features.technology.heading")}</JaText>
          <div className="space-y-3">
            {techIcons.map((tech) => (
              <div key={tech.key} className="flex items-center gap-3">
                {tech.icon}
                <JaText as="span" className="ato-body">{t(tech.key)}</JaText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
