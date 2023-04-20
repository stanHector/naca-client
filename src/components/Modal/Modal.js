import React from 'react'
import Modal from 'react-modal';

const ModalComponent = ({children, open, close, customStyles}) => {
  return (
  <Modal isOpen={open} onRequestClose={close} style={customStyles} ariaHideApp={false}> 
    {children}
  </Modal>
  )
}

export default ModalComponent