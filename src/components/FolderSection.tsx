import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { IoFolderOpen } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addFolder, selectFolder } from "../store/slices/folderSlice";

const FolderSection = () => {
  const [addToggle, setAddToggle] = useState(false);
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folders.folders);
  const selectedFolderId = useSelector((state) => state.folders.selectedFolderId);

  const handleAddFolder = () => {
    if (folderName.trim()) {
      const newId = Date.now();
      dispatch(addFolder({ id: newId, folderName }));
      setFolderName("");
      setAddToggle(false);
    }
  };

  const handleFolderClick = (id) => {
    dispatch(selectFolder(id));
  };

  return (
    <div>
      <div className="p-4 flex justify-center border border-black">
        <div
          className={`${addToggle ? "hidden" : "flex items-center justify-center"} cursor-pointer`}
          onClick={() => setAddToggle(!addToggle)}
        >
          <span className="text-3xl">
            <IoIosAddCircleOutline />
          </span>
          <span>Add Folder</span>
        </div>

        <div className={`${addToggle ? "flex" : "hidden"} items-center gap-4`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddFolder();
            }}
          >
            <input
              className="border border-black p-1 rounded-lg focus:outline-none"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Add The Folder"
            />
          </form>
          <span
            className="p-2 bg-red-400 cursor-pointer rounded-full"
            onClick={() => setAddToggle(!addToggle)}
          >
            <RxCross2 />
          </span>
        </div>
      </div>

      {/* Display folders */}
      <div>
        {folders.map((folder) => (
          <div key={folder.id} className={`flex items-center gap-2 p-2 cursor-pointer ${selectedFolderId === folder.id ? "bg-gray-300" : ""}`} onClick={() => handleFolderClick(folder.id)}>
            <IoFolderOpen />
            <h4>{folder.folderName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderSection;
