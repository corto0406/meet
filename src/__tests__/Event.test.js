import Event from '../components/Event';
import { render } from '@testing-library/react';
import mockData from '../mock-data';
import userEvent from '@testing-library/user-event';

const mockEvent = mockData.items[0];

describe('<Event /> Component', () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event event={mockEvent} />);
  });


  test('has the events title', () => {
    const titleElement = EventComponent.queryByText(mockEvent.summary);
    expect(titleElement).toBeInTheDocument();
  });

  test('has the events time', () => {
    const timeElement = EventComponent.queryByText(mockEvent.created);
    expect(timeElement).toBeInTheDocument();
  });

  test('has the events location', () => {
    const locationElement = EventComponent.queryByText(mockEvent.location);
    expect(locationElement).toBeInTheDocument();
  });

  test('has the button "show details"', () => {
    const button = EventComponent.queryByText('show details');
    expect(button).toBeInTheDocument();
  });

  test('by default event details are hidden', () => {
    const eventDOM = EventComponent.container.firstChild;
    const details = eventDOM.querySelector('.detailsOpened');
    expect(details).not.toBeInTheDocument();
  });

  test('show details after user clicks button "show details"', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText('show details');
    await user.click(button);

    const eventDOM = EventComponent.container.firstChild;
    const details = eventDOM.querySelector('.detailsOpened');
    expect(details).toBeInTheDocument();
  });

  test('hide details after user clicks button "hide details"', async () => {
    const button = EventComponent.queryByText('show details');
    const eventDOM = EventComponent.container.firstChild;
    await userEvent.click(button);

    const hideButton = EventComponent.queryByText('hide details');
    await userEvent.click(hideButton);

    const details = eventDOM.querySelector('.detailsClosed');
    expect(details).toBeInTheDocument();
  });

  test('has the events description', () => {
    const eventDOM = EventComponent.container.firstChild;
    const details = eventDOM.querySelector('.detailsOpened');
    const descriptionElement = EventComponent.queryByText(mockEvent.description);
    expect(descriptionElement).not.toBeInTheDocument();

  });
});

