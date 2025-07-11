// A function whose only purpose is to delay execution
// for the specified # of milliseconds when used w/ `await`
// e.g. inside an async function:
// await sleep(2000)  => pauses the function for 2 seconds before moving on
function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

//FUNCTIONS

/*

export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const response = await fetch(url);
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data.vans;
}

*/

/*
export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const response = await fetch(url);
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data.vans;
}

*/

export async function loginUser(creds) {
  const response = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.message,
      statusText: response.statusText,
      status: response.status,
    };
  }

  return data;
}
