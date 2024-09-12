import FolderSection from "./FolderSection";
import NoteSection from "./NoteSection";

const Section: React.FC = () => {
  return (
    <div className="flex border border-black h-[500px]  ">
      <div className="w-1/4 border-r border-black  bg-white">
        <FolderSection />
      </div>
      <div className="w-3/4 bg-white">
        <NoteSection />
      </div>
    </div>
  );
};

export default Section;
