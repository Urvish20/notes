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
        <div className="w-3/12 border">
          <NoteFiles />
        </div>
        <div className="w-9/12 border">
          <NoteData />
        </div>
      </div>
    </div>
  );
};

export default NoteSection;
