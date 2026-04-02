import { JaText } from './JaText';
import { useT } from '../../i18n';

export function Concept() {
  const t = useT();
  return (
    <section className="relative w-full">
      <div className="relative text-left space-y-4">
        <JaText as="h2" className="ato-heading" style={{ fontFeatureSettings: "'palt' 1" }}>{t("concept.heading")}</JaText>

        <div className="space-y-8 ato-body text-left tracking-[0.05em]">
          <JaText>{t("concept.body1")}</JaText>
          <JaText>{t("concept.body2")}</JaText>
        </div>
      </div>
    </section>
  );
}
