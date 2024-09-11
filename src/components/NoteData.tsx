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
    if (selectedFileId) {
      dispatch(addFileData({ fileId: selectedFileId, fileData: data }));
      setIsEditing(false); 
      dispatch(setAddNoteToggle(false));
      dispatch(setHideTopSection(true)); 
    }
  };

  const handleAddNoteClick = () => {
    if (!selectedFileId) {
      alert("Please create a file before adding a note.");
    } else {
      dispatch(setAddNoteToggle(true));
      setIsEditing(true); 
    }
  };

  const handleDeleteNote = (id: number) => {
    dispatch(deleteFileData({ id })); 
  };
  
  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10">
      {!hideTopSection && (
        <div className="w-full max-w-lg">
          <div className={`${addNoteToggle && isEditing ? "hidden" : "flex"} justify-center items-center h-[200px] sm:h-[300px] md:h-[400px]`}>
            <div
              className="flex flex-col gap-2 justify-center items-center border border-gray-300 rounded-lg cursor-pointer h-[60px] w-[100px] sm:h-[80px] sm:w-[120px] md:h-[100px] md:w-[140px]"
              onClick={handleAddNoteClick}
            >
              <span className="flex items-center justify-center text-3xl sm:text-4xl">
                <IoAddCircleOutline />
              </span>
              <h1 className="flex justify-center items-center text-sm sm:text-base">Add Note</h1>
            </div>
          </div>

          <div className={`${addNoteToggle && isEditing ? "flex" : "hidden"} p-4 gap-3 justify-center items-center border h-[200px] sm:h-[250px] md:h-[300px]`}>
            <form onSubmit={handleSubmit} className="flex-grow">
              <ReactQuill
                value={data}
                onChange={setData}
                placeholder="Write a note..."
                className="w-[400px] border border-gray-400 rounded-md"
              />
              <button
                type="submit"
                className="p-2 sm:p-3 bg-[#007EE5] text-white rounded-md mt-2"
              >
                Save Note
              </button>
            </form>
            <span
              className="p-2 sm:p-3 bg-[#007EE5] cursor-pointer rounded-full"
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

      <div className="w-full max-w-lg mt-4 relative">
        {selectedFolder &&
          selectedFolder.files.map((file) => {
            if (file.id === selectedFileId && file.fileData) {
              return (
                <div key={file.id} className="p-4 border border-gray-300 rounded-lg h-[200px] sm:h-[250px] md:h-[300px]">
                  {isEditing ? (
                    <div className="flex flex-col">
                      <ReactQuill
                        value={data}
                        onChange={setData}
                        placeholder="Write a note............."
                        className="w-full border border-gray-400 rounded-md"
                      />
                      <button
                        onClick={() => {
                          dispatch(addFileData({ fileId: file.id, fileData: data }));
                          setIsEditing(false);
                        }}
                        className="p-2 sm:p-3 bg-[#007EE5] text-white rounded-md mt-2"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className='w-[100px]'>
                      <div  className='w-[100px]' dangerouslySetInnerHTML={{ __html: file.fileData }} />
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-2 px-6 py-2 bg-[#007EE5] text-white rounded-md absolute bottom-5 right-5"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNote(file.id)}
                        className="mt-2 px-4 py-2 bg-[#e50000] text-white rounded-md absolute bottom-5 right-[7rem]"
                      >
                        delete
                      </button>
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
