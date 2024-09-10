import { useState } from "react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addFile, selectFile } from "../store/slices/folderSlice";
import { FaFileAlt } from "react-icons/fa";

const NoteFiles = () => {
  const [addFileToggle, setAddFileToggle] = useState(false);
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();

  const selectedFolderId = useSelector((state) => state.folders.selectedFolderId);
  const selectedFolder = useSelector((state) =>
    state.folders.folders.find((folder) => folder.id === selectedFolderId)
  );
  const selectedFileId = useSelector((state) => state.folders.selectedFileId);

  const handleAddFile = () => {
    if (fileName.trim()) {
      const newId = Date.now();
      dispatch(addFile({ id: newId, fileName, fileData: [] }));
      setFileName("");
      setAddFileToggle(false);
    } else {
      alert("Please enter a valid file name.");
    }
  };

 
  const handleFileClick = (id) => {
    dispatch(selectFile(id));
    console.log(selectedFileId)
  };

  return (
    <div className="px-5">
      {/* File creation section */}
      <div className="py-2">
        {/* Toggle button to show or hide file input */}
        <div
          className={`${
            addFileToggle ? "hidden" : "flex items-center justify-between"
          } text-xl cursor-pointer py-2`}
          onClick={() => setAddFileToggle(!addFileToggle)}
        >
          <h1>Add File</h1>
          <span className="text-2xl">
            <FaFileCirclePlus />
          </span>
        </div>

        {/* Input for adding a new file */}
        <div className={`${addFileToggle ? "flex" : "hidden"} items-center gap-5`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddFile();
            }}
          >
            <input
              className="border border-black py-1 px-6 rounded-lg focus:outline-none"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
            />
          </form>
          <span
            className="p-2 bg-red-400 cursor-pointer rounded-full"
            onClick={() => setAddFileToggle(!addFileToggle)}
          >
            <RxCross2 />
          </span>
        </div>
      </div>

      {/* Display the files in the selected folder */}
      <div>
        {selectedFolder ? (
          selectedFolder.files.length > 0 ? (
            selectedFolder.files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center gap-2 p-2 cursor-pointer ${
                  selectedFileId === file.id ? "bg-gray-300" : ""
                }`}
                onClick={() => handleFileClick(file.id)}
              >
                <FaFileAlt />
                <h4>{file.fileName}</h4>
              </div>
            ))
          ) : (
            <p>No files available in this folder.</p>
          )
        ) : (
          <p>No folder selected.</p>
        )}
      </div>
    </div>
  );
};

export default NoteFiles;
