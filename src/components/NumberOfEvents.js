import { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {
  const [value, setValue] = useState("32");

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumberOfEvents(value);
    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "only positive number are valid";
      setErrorAlert(errorText);
    } else {
      errorText = "";
      setErrorAlert(errorText);
      setNumberOfEvents(value);
    }
  };


  return (
    <div id="number-of-events">
      <input
        type="text"
        className="event-number"
        value={value}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;