import React, { useState } from "react";

import { Button } from "./Reusable";

const SQLSelection = () => {

  const [clickedButton, setClickedButton] = useState('');

  return (
    <div>
      <Button classname="button-select" onClick={setClickedButton} name='SELECT' />
      <Button classname="button-from" onClick={setClickedButton} name='FROM' />
      <Button classname="button-where" onClick={setClickedButton} name='WHERE' />
    </div>
  )

}

export default SQLSelection;
