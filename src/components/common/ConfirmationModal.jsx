import React from 'react'
import Iconbtn from './Iconbtn'
import Icon from 'react-icon'

function ConfirmationModal({modalData}) {
  return (
    <div>
        <div>
            <p>
                {modalData.text1}
            </p>
            <p>
                {modalData.text2}
            </p>
            <div>
                <Iconbtn
                    onClick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                />
                <button onClick={modalData.btn2Handler} >
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal