import React from "react";

import {
  cleanup,
  render,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getByAltText,
  queryByText,
  queryByAltText,
  getByPlaceholderText,
  getAllByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe("Form", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
    .then(()=> {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Cohana Roy")).toBeInTheDocument();
      expect(getByText("Leopold Silvers")).toBeInTheDocument();

    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Cohana Roy"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Archie Cohen" }
    });
    fireEvent.click(getByAltText(appointment, "Cohana Roy"));

    fireEvent.click(getByText(appointment, "Save"));
    debug(appointment)
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Archie Cohen"));
    expect(getByText(appointment, "Edit")).toBeInTheDocument();
  });


});


