import React, { useState } from 'react';
import Modal from 'react-modal';

const ExportModal = ({ isOpen, onRequestClose, onExport }) => {
  const [filename, setFilename] = useState('');

  const handleExport = () => {
    onExport(filename);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Export to Excel</h2>
        <input
          type="text"
          placeholder="Enter filename"
          className="border p-2 mb-4"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Export
        </button>
      </div>
    </Modal>
  );
};

export default ExportModal;