async function checkVerification() {
    console.log('running checkVerification')

    const h1 = document.querySelector("h1")
    const p = document.querySelector("p")

    // get token from query string
    const params = (new URL(document.location)).searchParams;
    const token = params.get("token")

    if (!token) {
        h1.innerHTML = "Something went wrong."
        p.innerHTML = "Please click the link in the email that was sent to you."

        console.log("No token found")

        setTimeout(() => {
            location.href = "index.html"
        }, 4000)
        return
    }

    const url = "https://football-api-server-ane2c4bwdacvf8f6.eastus-01.azurewebsites.net/coachuser/verification"

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let response = await fetch(url, options)

    if (response.status == 200) {
        h1.innerHTML = 'Thank you! Your email has been verified.'
        p.innerHTML = 'You will be redirected to the app momentarily.'

        console.log("Verification successful")
        localStorage.setItem("token", token);

        setTimeout(() => {
            location.href = "coachmain.html"
        }, 4000)
    }
    else {
        h1.innerHTML = "Something went wrong."
        p.innerHTML = "Please try verifying your account once more."

        console.log("Error verifying email address")
        console.log(token)
        console.log(response.status)
        console.log(response)
        setTimeout(() => {
            location.href = "index.html"
        }, 4000)
    }
}

checkVerification()