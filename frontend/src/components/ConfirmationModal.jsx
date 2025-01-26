/* eslint-disable react/prop-types */
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          Are you sure you want to delete this post?
        </h2>
        <div className="flex justify-end">
          <button className="btn btn-secondary mr-2" onClick={onClose}>
            No
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
