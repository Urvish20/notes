import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFileData } from "../store/slices/folderSlice";

const NoteData = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const selectedFileId = useSelector((state) => state.folders.selectedFileId);
  const selectedFolder = useSelector((state) => state.folders.folders.find((folder) => folder.id === state.folders.selectedFolderId) );

  const handleAddData = () => {
    if (data.trim() && selectedFolder && selectedFileId) {
      dispatch(addFileData(data));
      setData(""); 
    }
    // console.log(selectedFileId)
  };

  return (
    <div className="flex-col justify-center">
      <h1>Data</h1>
      <input
        type="text"
        placeholder="Write a note"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleAddData} className="bg-blue-500 text-white p-2 mt-2">
        Add Data
      </button>

      

      {/* Displaying the added data */}
      <div>
        {/* {selectedFolder &&
          selectedFolder.files.map((file) => {
            if (file.id === selectedFileId) {
              return (
                <div key={file.id} className="mt-4 bg-gray-100 p-4 rounded-lg">
                  {file.fileData.map((note, index) => (
                   
                  ))}
                </div>
              );
            }
            return null;
          })} */}


          <p></p>
      </div>
    </div>
  );
};

export default NoteData;
