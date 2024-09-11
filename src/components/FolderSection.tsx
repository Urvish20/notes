import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { IoFolderOpen } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store"; 
import { addFolder, selectFolder } from "../store/slices/folderSlice";
import { setAddFolderToggle } from "../store/slices/toggleSlice";

interface Folder {
  id: number;
  folderName: string;
}

const FolderSection: React.FC = () => {
  const [folderName, setFolderName] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const folders = useSelector((state: RootState) => state.folders.folders);
  const selectedFolderId = useSelector((state: RootState) => state.folders.selectedFolderId);
  const addFolderToggle = useSelector((state: RootState) => state.toggle.addFolderToggle);

  const handleAddFolder = () => {
    if (folderName.trim()) {
      const newId = Date.now();
      dispatch(addFolder({ id: newId, folderName }));
      setFolderName("");
      dispatch(setAddFolderToggle(false));
    }
  };

  const handleFolderClick = (id: number) => {
    dispatch(selectFolder(id));
  };

  const handleToggleClick = () => {
    dispatch(setAddFolderToggle(!addFolderToggle));
    setFolderName("");
  };

  console.log("folders",folders )

  return (
    <div>
      <div className="flex justify-center border-b border-black p-4">
        <div
          className={`${
            addFolderToggle ? "hidden" : "flex items-center justify-center"
          } cursor-pointer`}
          onClick={handleToggleClick}
        >
          <span className="text-3xl md:text-2xl">
            <IoIosAddCircleOutline />
          </span>
          <span className="ml-2 text-lg md:text-base">Add Folder</span>
        </div>

        <div className={`${addFolderToggle ? "flex" : "hidden"} items-center gap-4`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddFolder();
            }}
            className="flex items-center"
          >
            <input
              className="border border-black p-1 rounded-lg focus:outline-none w-full md:w-auto"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Add The Folder"
            />
          </form>
          <span
            className="p-2 bg-[#007EE5] cursor-pointer rounded-full"
            onClick={handleToggleClick}
          >
            <RxCross2 />
          </span>
        </div>
      </div>

      <div className="overflow-y-auto">
        {folders.map((folder: Folder) => (
          <div
            key={folder.id}
            className={`flex items-center gap-4 md:gap-8 text-lg md:text-xl px-4 md:px-8 py-2 md:py-4 cursor-pointer ${
              selectedFolderId === folder.id ? "bg-[#FAEFCC]" : ""
            }`}
            onClick={() => handleFolderClick(folder.id)}
          >
            <IoFolderOpen />
            <h4>{folder.folderName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderSection;
