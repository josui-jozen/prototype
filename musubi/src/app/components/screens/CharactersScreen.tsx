import Stand from "@/imports/通常";
import Send from "@/imports/送信";
import Reply from "@/imports/返信";
import Rest from "@/imports/やすみ";

const CHARACTERS = [
  { name: "通常", Component: Stand },
  { name: "送信", Component: Send },
  { name: "返信", Component: Reply },
  { name: "やすみ", Component: Rest },
];

export default function CharactersScreen() {
  return (
    <div className="min-h-[100dvh] px-6">
      <h1 className="text-2xl font-bold text-app-text mb-6 tracking-widest">キャラクター一覧</h1>
      <div className="grid grid-cols-2 gap-6">
        {CHARACTERS.map(({ name, Component }) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div className="w-40 h-40">
              <Component />
            </div>
            <span className="text-app-text text-sm font-medium">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
