import React, { useEffect } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

function AiOutputDialog({ openDialog, setOpenDialog, orgImage, aiImage }) {
  useEffect(() => {
    if (openDialog) {
      document.getElementById('my_modal_1')?.showModal();
    }
  }, [openDialog]);

  const handleClose = () => {
    setOpenDialog(false);
    document.getElementById('my_modal_1')?.close();
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Result</h3>

          {aiImage && orgImage && (
            <ReactBeforeSliderComponent
              firstImage={{
                imageUrl: aiImage,
              }}
              secondImage={{
                imageUrl: orgImage,
              }}
            />
          )}

          <div className="modal-action">
            <form method="dialog">
              <button type="button" className="btn" onClick={handleClose}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AiOutputDialog;