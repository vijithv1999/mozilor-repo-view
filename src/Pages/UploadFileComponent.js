import React, { useState } from 'react';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS
import { AiOutlineCloudUpload } from 'react-icons/ai'; // Import the required icon
import { useBookmarkContext } from '../Providers/BookmarkProvider';
const UploadFileComponent = ({ name }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { handleFileUpload } = useBookmarkContext()

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    handleFileUpload(file, name);
    setSelectedFile(null)
  };

  return (
    <div className="field">
      <div className="file is-info has-name">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            accept=".xlsx,.csv"
            onChange={handleChange}
            disabled={selectedFile !== null}
          />
          <span className="file-cta">
            <span className="file-icon">
              <AiOutlineCloudUpload /> {/* Use the icon component */}
            </span>
            <span className="file-label">{name}*</span>
          </span>
          {selectedFile && (
            <span className="file-name">{selectedFile.name}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default UploadFileComponent;
