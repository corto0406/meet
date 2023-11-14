import { useState } from "react";

const NumberOfEvents = () => {
  const [value, setValue] = useState("32");

  const handleInputChanged = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
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