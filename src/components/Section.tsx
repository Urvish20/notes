import FolderSection from "./FolderSection";
import NoteSection from "./NoteSection";

const Section = () => {
  return (
    <div className="border flex h-[500px]">
      <div className="border border-red-600 w-1/4">
        <FolderSection />
      </div>
      <div className="border border-yellow-400 w-3/4">
        <NoteSection />
      </div>
    </div>
  );
};

export default Section;
