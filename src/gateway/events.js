const events = [
  {
    id: 1,
    title: "Go to the gym",
    description: "some text here",
    dateFrom: new Date(2022, 8, 15, 10, 15),
    dateTo: new Date(2022, 8, 15, 15, 0),
  },
  {
    id: 2,
    title: "Go to the school",
    description: "hello, 2 am",
    dateFrom: new Date(2022, 8, 16, 10, 15),
    dateTo: new Date(2022, 8, 16, 11, 0),
  },
  {
    id: 3,
    title: "Lunch",
    description: "",
    dateFrom: new Date(2022, 8, 17, 10, 30),
    dateTo: new Date(2022, 8, 17, 11, 30),
  },
  {
    id: 4,
    title: "Meet friend",
    description: "at the cafe",
    dateFrom: new Date(2022, 8, 25, 10, 30),
    dateTo: new Date(2022, 8, 25, 11, 0),
  },
  {
    id: 5,
    title: "Meet friend",
    description: "at the cafe",
    dateFrom: new Date(2022, 7, 16, 10, 30),
    dateTo: new Date(2022, 7, 16, 11, 0),
  },
];

export default events;

const serverUrl = "https://62d56536d4406e523559e20d.mockapi.io/avi/v1/calendar";
