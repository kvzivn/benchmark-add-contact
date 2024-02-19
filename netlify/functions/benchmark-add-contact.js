const fetch = require("node-fetch")

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const { email } = JSON.parse(event.body)
  const API_ENDPOINT = `https://clientapi.benchmarkemail.com/Contact/21019657/ContactDetails`
  const AUTH_TOKEN = process.env.BENCHMARK_API_KEY

  return fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      AuthToken: AUTH_TOKEN,
    },
    body: JSON.stringify({
      Data: {
        Email: email,
        EmailPerm: "1",
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify({ Msg: data }),
    }))
    .catch((error) => ({
      statusCode: 422,
      body: String(error),
    }))
}
