import React, { useState } from "react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addFile, selectFile } from "../store/slices/folderSlice";
import { setAddFileToggle } from "../store/slices/toggleSlice";
import { FaFileAlt } from "react-icons/fa";
import { RootState } from "../store/store"; 

const NoteFiles: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const dispatch = useDispatch();

  const selectedFolderId = useSelector((state: RootState) => state.folders.selectedFolderId);
  const selectedFolder = useSelector((state: RootState) =>
    state.folders.folders.find((folder) => folder.id === selectedFolderId)
  );
  const selectedFileId = useSelector((state: RootState) => state.folders.selectedFileId);
  const addFileToggle = useSelector((state: RootState) => state.toggle.addFileToggle);

  const handleAddFile = () => {
    const newId = Date.now();
    dispatch(addFile({ id: newId, fileName, fileData: "" }));
    setFileName("");
    dispatch(setAddFileToggle(false));
  };

  const handleFileClick = (id: number) => {
    dispatch(selectFile(id));
  };

  const handleToggleClick = () => {
    dispatch(setAddFileToggle(!addFileToggle));
    setFileName("");
  };

  return (
    <div>
      <div className="flex justify-center border-b border-black p-4">
        <div
          className={`${
            addFileToggle ? "hidden" : "flex items-center gap-4 md:gap-8 justify-center"
          } text-lg md:text-xl cursor-pointer`}
          onClick={handleToggleClick}
        >
          <h1>Add File</h1>
          <span className="text-xl md:text-2xl">
            <FaFileCirclePlus />
          </span>
        </div>

        <div className={`${addFileToggle ? "flex" : "hidden"} items-center gap-4 md:gap-5`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddFile();
            }}
          >
            <input
              className="border border-black py-1 px-4 md:px-6 rounded-lg focus:outline-none w-full md:w-auto"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
            />
          </form>
          <span className="p-2 bg-[#007EE5] cursor-pointer rounded-full" onClick={handleToggleClick}>
            <RxCross2 />
          </span>
        </div>
      </div>

      <div className="overflow-y-auto">
        {selectedFolder &&
          selectedFolder.files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center gap-2 md:gap-4 p-2 md:p-4 w-full cursor-pointer text-base md:text-lg ${
                selectedFileId === file.id ? "bg-[#FAEFCC]" : ""
              }`}
              onClick={() => handleFileClick(file.id)}
            >
              <FaFileAlt />
              <h4>{file.fileName}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NoteFiles;
