import React from "react";
import Button from "../../components/library/src/Button/Button";

const page = () => {
  return (
    <div>
      <Button
        padding="10px 30px"
        margin="10px"
        bgColor="green"
        textColor="yellow"
        border="2px solid red"
        borderRadius="10px"
        width="150px"
        height="50px"
        hoverBgColor="darkgreen"
        hoverTextColor="black"
      >
        Custom Button
      </Button>
    </div>
  );
};

export default page;
