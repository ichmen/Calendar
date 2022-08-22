const serverUrl = "https://62d56536d4406e523559e20d.mockapi.io/avi/v1/calendar";

export function postData(data) {
  return fetch(serverUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function deleteData(id) {
  return fetch(`${serverUrl}/${id}`, {
    method: "DELETE",
  });
}

export function getData() {
  return fetch(serverUrl)
    .then((response) => response.json())
    .then((data) =>
      data.map((event) => {
        return {
          ...event,
          dateFrom: new Date(event.dateFrom),
          dateTo: new Date(event.dateTo),
        };
      })
    );
}
