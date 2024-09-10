import NoteData from "./NoteData";
import NoteFiles from "./NoteFiles";
import SectionHeader from "./SectionHeader";

const NoteSection = () => {
  return (
    <div>
      <div className="w-full">
        <SectionHeader />
      </div>
      <div className="flex">
        <div className="w-4/12 h-[440px] border">
          <NoteFiles />
        </div>
        <div className="w-8/12 h-[440px] border">
          <NoteData />
        </div>
      </div>
    </div>
  );
};

export default NoteSection;
