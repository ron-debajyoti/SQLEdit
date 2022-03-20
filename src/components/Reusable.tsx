import React from "react";

type ButtonProps = {
  classname: string,
  onClick: any,
  name: string,
}

export const Button = (props: ButtonProps) => (
  <button className={props.classname} onClick={props.onClick}>
    {props.name}
  </button>
)