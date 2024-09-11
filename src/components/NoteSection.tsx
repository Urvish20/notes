import NoteData from "./NoteData";
import NoteFiles from "./NoteFiles";

const NoteSection: React.FC = () => {
  return (
    <div className="flex h-full">
      <div className="w-4/12 border-r border-black">
        <NoteFiles />
      </div>
      <div className="w-8/12 p-4">
        <NoteData />
      </div>
    </div>
  );
};

export default NoteSection;
