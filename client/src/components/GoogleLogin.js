import React from 'react'
import GoogleLogin from 'react-google-login'

const Googlelogin = () => {
    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.profileObj);
    }
    return (
        <div>
            <GoogleLogin 
                clientId="232235946871-dnhreg90q64nm5ev9n1an8r7skg8igec.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Googlelogin
