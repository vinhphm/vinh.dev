import mailchimp from "@mailchimp/mailchimp_marketing"

mailchimp.setConfig({
  apiKey: import.meta.env.MAILCHIMP_API_KEY,
  server: import.meta.env.MAILCHIMP_API_SERVER, // e.g. us1
})

export const post = async ({ request }) => {
  let email

  if (request.headers.get("Content-Type") === "application/json") {
    const formData = await request.json()
    email = formData.email
  }

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    })
  }

  try {
    await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    })

    return new Response(JSON.stringify({ error: "" }), {
      status: 201,
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || error.toString() }),
      {
        status: 500,
      }
    )
  }
}
