import React from "react";
import { ThumbsDownIcon, ThumbsUpIcon } from "./icons";

const SourceModal: React.FC<{ close: () => void, forward: () => void}> = ({  close, forward }) => {
  return (/*
    <Dialog open={open}>
      <DialogTitle>
        Lookin' for source code?
      </DialogTitle>
      <DialogContent>
        The way u are trying to get the source is sneaky. Lemme show you the right way.
      </DialogContent>
      <DialogActions>
        <IconButton onClick={close}>View Source in Github</IconButton>
        <IconButton onClick={forward}>Proceed to source (You may not get what u r lookin' for.)</IconButton>
      </DialogActions>
    </Dialog>
  */
  <>
    <div className="source-modal__container">
      <div className="font-mono">
        <div className="text-4xl">Lookin' for source code?</div>  
      </div>
      <div className="source-modal__action-bar">
        <button onClick={forward} className="source-modal__yes-btn"><ThumbsUpIcon />&nbsp;Ok</button>
        <button onClick={close} className="source-modal__no-btn"><ThumbsDownIcon />&nbsp;Nope</button>
      </div>
    </div>
  </>)
}

export default SourceModal