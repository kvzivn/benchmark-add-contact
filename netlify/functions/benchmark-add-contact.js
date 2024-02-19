const fetch = require("node-fetch")

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    return {
      statusCode: 400,
      body: "Cannot parse body: " + error.message,
    }
  }

  const { email } = body
  const API_ENDPOINT = `https://clientapi.benchmarkemail.com/Contact/21019657/ContactDetails`
  const AUTH_TOKEN = process.env.BENCHMARK_API_KEY

  try {
    const response = await fetch(API_ENDPOINT, {
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

    if (!response.ok) {
      throw new Error("Error: " + response.status)
    }

    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ Msg: data }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: String(error),
    }
  }
}
