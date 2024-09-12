import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'; 
import { addFileData, deleteFileData } from '../store/slices/folderSlice';
import { setAddNoteToggle, setHideTopSection } from '../store/slices/toggleSlice'; 
import { IoAddCircleOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteData: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false); 
  const dispatch: AppDispatch = useDispatch();

  const selectedFileId = useSelector((state: RootState) => state.folders.selectedFileId);
  const selectedFolder = useSelector((state: RootState) =>
    state.folders.folders.find((folder) => folder.id === state.folders.selectedFolderId)
  );
  const addNoteToggle = useSelector((state: RootState) => state.toggle.addNoteToggle);
  const hideTopSection = useSelector((state: RootState) => state.toggle.hideTopSection); 

  useEffect(() => {
    if (selectedFolder && selectedFileId) {
      const file = selectedFolder.files.find((file) => file.id === selectedFileId);
      if (file && file.fileData) {
        setData(file.fileData);
        dispatch(setHideTopSection(true)); 
      } else {
        setData("");
        dispatch(setHideTopSection(false)); 
      }
    }
  }, [selectedFolder, selectedFileId, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFileId && data.trim()) {
      dispatch(addFileData({ fileId: selectedFileId, fileData: data }));
      setIsEditing(false); 
      dispatch(setAddNoteToggle(false));
      dispatch(setHideTopSection(true)); 
    }
  };

  const handleAddNoteClick = () => {
    if (!selectedFileId) {
      alert("Please create and select a file before adding a note.");
    } else {
      dispatch(setAddNoteToggle(true));
      setIsEditing(true); 
    }
  };

  const handleDeleteNote = (id: number) => {
    dispatch(deleteFileData({ id })); 
  };
  
  return (
    <div className="flex flex-col p-4 sm:p-6 h-auto w-full max-w-4xl bg-white">
      {!hideTopSection && (
        <div className="w-full">
          <div className={`${addNoteToggle && isEditing ? "hidden" : "flex"} justify-center items-center h-[150px] sm:h-[180px] md:h-[200px] lg:h-[430px]`}>
            <div
              className="flex flex-col gap-2 justify-center items-center border border-gray-300 rounded-lg cursor-pointer h-[80px] w-[120px] sm:h-[100px] sm:w-[140px] md:h-[120px] md:w-[160px] lg:h-[140px] lg:w-[180px]"
              onClick={handleAddNoteClick}
            >
              <span className="flex items-center justify-center text-4xl lg:text-5xl">
                <IoAddCircleOutline />
              </span>
              <h1 className="text-sm sm:text-base md:text-lg">Add Note</h1>
            </div>
          </div>

          <div className={`${addNoteToggle && isEditing ? "flex" : "hidden"} p-4 gap-3 w-full`}>
            <form onSubmit={handleSubmit} className="flex-grow">
              <ReactQuill
                value={data}
                onChange={setData}
                placeholder="Write a note..."
                className="w-full border border-gray-400 rounded-md"
              />
              {data.trim() && (
                <button
                  type="submit"
                  className="p-2 sm:p-3 bg-blue-600 text-white rounded-md mt-2"
                >
                  Save Note
                </button>
              )}
            </form>
            <span
              className="flex justify-center items-center w-[40px] h-[40px] bg-blue-600 cursor-pointer rounded-full"
              onClick={() => {
                dispatch(setAddNoteToggle(false));
                setIsEditing(false); 
              }}
            >
              <RxCross2 />
            </span>
          </div>
        </div>
      )}

      <div className="w-full relative">
        {selectedFolder &&
          selectedFolder.files.map((file) => {
            if (file.id === selectedFileId && file.fileData) {
              return (
                <div key={file.id} className="p-4 border border-gray-300 rounded-lg h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                  {isEditing ? (
                    <div className="flex flex-col">
                      <ReactQuill
                        value={data}
                        onChange={setData}
                        placeholder="Write a note..."
                        className="w-full border border-gray-400 rounded-md"
                      />
                      {data.trim() && (
                        <button
                          onClick={() => {
                            dispatch(addFileData({ fileId: file.id, fileData: data }));
                            setIsEditing(false);
                          }}
                          className="p-2 sm:p-3 bg-blue-600 text-white rounded-md mt-2"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="w-full">
                      <div dangerouslySetInnerHTML={{ __html: file.fileData }} className="w-full" />
                      <div className="absolute bottom-5 right-5 flex gap-2">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(file.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default NoteData;
