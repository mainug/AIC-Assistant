import {
  CHARACTER_ELEMENT_LABEL,
  CHARACTER_PROFESSION_LABEL,
  type CharacterElement,
  type CharacterProfession,
} from "../../data/operators";

type CharacterIconStackProps = {
  element: CharacterElement;
  profession: CharacterProfession;
};

function getElementIconPath(element: string) {
  return `/icons/endfield/elements/${element}.png`;
}

function getProfessionIconPath(profession: string) {
  return `/icons/endfield/professions/${profession}.png`;
}

function CharacterIconStack({ element, profession }: CharacterIconStackProps) {
  return (
    <div className="character-icon-stack">
      <div className="character-mini-icon">
        {element === "unknown" ? (
          <span>미분류</span>
        ) : (
          <img
            src={getElementIconPath(element)}
            alt={CHARACTER_ELEMENT_LABEL[element]}
          />
        )}
      </div>

      <div className="character-mini-icon">
        {profession === "unknown" ? (
          <span>미분류</span>
        ) : (
          <img
            src={getProfessionIconPath(profession)}
            alt={CHARACTER_PROFESSION_LABEL[profession]}
          />
        )}
      </div>
    </div>
  );
}

export default CharacterIconStack;
