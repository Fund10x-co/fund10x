async function fetchAccessToken() {
  let client_id = "3f0a2875-ff07-4a78-8b5b-1e914ca7e7b5";
  let tenant_id = "638fcbaf-ba4c-43e1-adae-5475c970fe10";
  let client_secret = "1tb8Q~ZKQwX6Vl_ud8THDJmzgBO~qSxzbsQgab7f";
  // let request = {
  //     scopes: ['api://995b2203-b276-4b0e-a08d-0609a97e7d66/.default']
  // };

  const response = await fetch(
    `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&scope=api://${client_id}/.default`,
    }
  );

  return await response.json();
}

const page = async () => {
  const accessToken = await fetchAccessToken();
  console.log("accessToken", accessToken);

  return (
    <div>
      <h3> Hi</h3>
    </div>
  );
};

export default page;
