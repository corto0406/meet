import { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {
  const [value, setValue] = useState("32");

  const handleInputChanged = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    let errorText;
    if (isNaN(newValue) || newValue <= 0) {
      errorText = "only positive numbers are valid";
      setErrorAlert(errorText);
    } else {
      errorText = "";
      setErrorAlert(errorText);
      setNumberOfEvents(newValue);
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
